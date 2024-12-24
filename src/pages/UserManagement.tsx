// src/pages/UserManagement.tsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../components/types/storeTypes';
import { clearSelectedUser, deleteUser, fetchUsers, selectUser, toggleUserStatus } from '../redux/slices/userSlice';
import Table from '../components/table/Table';
import Action from '../components/actions/user-action'; 

const UserManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error, emptyMessage, selectedUser } = useSelector((state: RootState) => state.users);
  const [newStatus, setNewStatus] = useState<'Active' | 'Inactive'>('Active');
  const [newRole, setNewRole] = useState<'Admin' | 'User' | 'Guest'>('User'); 

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
      }));
      handleCloseDetails();
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

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid">
      <h2>User Management</h2>

      {users.length > 0 ? (
        <Table columns={columns} data={users} Actions={(props) => <Action {...props} handleViewDetails={handleViewDetails} handleDelete={handleDelete} />} />
      ) : (
        <p>{emptyMessage}</p>
      )}

      {/* Custom Modal */}
      {selectedUser && (
        <div className="custom-modal" style={{ display: selectedUser ? 'block' : 'none' }}>
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseDetails}>&times;</span>
            <h3>User Details</h3>
            <p><strong>User Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Current Status:</strong> {selectedUser.isActive}</p>

            <label>
              <strong>Update Status:</strong>
              <select
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as 'Active' | 'Inactive')}
                className="form-control mt-2"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>

            <label>
              <strong>Update Role:</strong>
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

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseDetails}>Close</button>
              <button className="btn btn-primary" onClick={handleToggleStatus}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
