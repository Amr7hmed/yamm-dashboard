/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/store';
import { clearSelectedUser, deleteUser, fetchUsers, selectUser, toggleUserStatus } from '../redux/slices/userSlice';
import Table from '../components/table/Table';
import { Modal, Button } from 'react-bootstrap';

const UserManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error, emptyMessage, selectedUser } = useSelector((state: RootState) => state.users);
  const [newStatus, setNewStatus] = useState<'نشط' | 'غير نشط'>('نشط');
  const [newRole, setNewRole] = useState<'Admin' | 'User' | 'Guest'>('User'); // إضافة حالة جديدة لتغيير الدور

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleViewDetails = (id: string) => {
    dispatch(selectUser(id));
  };

  const handleToggleStatus = () => {
    if (selectedUser) {
      dispatch(toggleUserStatus({
        id: selectedUser.id,
        isActive: newStatus,
        role: newRole,
        name: selectedUser.name,
        email: selectedUser.email,
      })).then(() => {
        handleCloseDetails(); // إغلاق المودال بعد تحديث الحالة
      });
    }
  };

  const handleCloseDetails = () => {
    dispatch(clearSelectedUser());
  };

  const columns = [
    { title: 'User ID', key: 'id' },
    { title: 'User Name', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'Role', key: 'role' },
    { title: 'Status', key: 'isActive' },
  ];

  const Action = (props: any) => {
    const { Item } = props;
    return (
      <div>
        <button className="btn btn-info" onClick={() => handleViewDetails(Item.id)}>View</button>
        <button className="btn btn-danger" onClick={() => handleDelete(Item.id)}>Delete</button>
      </div>
    );
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid">
      <h2>User Management</h2>

      {users.length > 0 ? (
        <Table columns={columns} data={users} Actions={Action} />
      ) : (
        <p>{emptyMessage}</p>
      )}

      {/* المودال */}
      {selectedUser && (
        <Modal show={!!selectedUser} onHide={handleCloseDetails}>
          <Modal.Header closeButton>
            <Modal.Title>تفاصيل المستخدم</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>اسم المستخدم:</strong> {selectedUser.name}</p>
            <p><strong>البريد الإلكتروني:</strong> {selectedUser.email}</p>
            <p><strong>الدور:</strong> {selectedUser.role}</p>
            <p><strong>الحالة الحالية:</strong> {selectedUser.isActive}</p>

            <label>
              <strong>تحديث الحالة:</strong>
              <select
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as 'نشط' | 'غير نشط')}
                className="form-control mt-2"
              >
                <option value="نشط">نشط</option>
                <option value="غير نشط">غير نشط</option>
              </select>
            </label>

            <label>
              <strong>تحديث الدور:</strong>
              <select
                value={newRole}
                onChange={e => setNewRole(e.target.value as 'Admin' | 'User' | 'Guest')}
                className="form-control mt-2"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Guest">Guest</option>
              </select>
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
              إغلاق
            </Button>
            <Button variant="primary" onClick={handleToggleStatus}>
              تحديث
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UserManagement;