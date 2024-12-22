import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getUsers } from '../redux/slices/userSlice'; 
import Table from '../components/table/Table';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const columns = [
    { title: 'User ID', key: 'userId' },
    { title: 'Username', key: 'username' },
    { title: 'Email', key: 'email' },
    { title: 'Role', key: 'role' },
    { title: 'Active Status', key: 'isActive' },
  ];

  const actions = (
    <>
      <button className="btn btn-info">Edit</button>
      <button className="btn btn-success">Activate/Deactivate</button>
      <button className="btn btn-danger">Delete</button>
    </>
  );

  return (
    <div>
      <h2>User Management</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Table columns={columns} data={users} actions={actions} />
      )}
    </div>
  );
};

export default UserManagement;
