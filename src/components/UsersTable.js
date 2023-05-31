import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import {useAuth} from '../hooks/useAuth';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/User');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockUsers = async () => {
    try {
      console.log(selectedUsers);
      await axios.put('/api/User/bulk-block', selectedUsers );
      
      console.log(user);

      if( selectedUsers.includes(user)){
        logout();
        <div class="toast align-items-center text-bg-primary border-0 fade show" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          Hello, world! This is a toast message.
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
        navigate("/");
      }
      fetchUsers();
      setSelectedUsers([]);
    } catch (error) {
      console.log('Error blocking users:', error);
    }
  };

  const handleActivateUsers = async () => {
    try {
      console.log(selectedUsers);
      await axios.put('/api/User/bulk-activate', selectedUsers );
      fetchUsers();
      setSelectedUsers([]);
    } catch (error) {
      console.log('Error blocking users:', error);
    }
  };

  const handleDeleteUsers = async () => {
    try {
      await axios.delete('/api/User/bulk-delete', {
        headers: { 'Content-Type': 'application/json' },
        data:  selectedUsers })
      fetchUsers();
    } catch (error) {
      console.log('Error deleting users:', error);
    }
  };






  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
      
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      const allUserIds = users.map((user) => user.id);
      setSelectedUsers(allUserIds);
    }
  };

  const handleSignout = () => {
    logout();
  }

  

  return (
    <div className='container bg-white border-2 shadow mt-5'>
      
      <div className="d-flex justify-content-between align-items-center border-bottom p-2">
  <h2>Users List</h2>
  <div className="d-flex gap-3">
    <div className="vr"></div>
    <button type="button" className="btn btn-danger" onClick={handleBlockUsers} disabled={selectedUsers.length === 0}>
      <i className="bi bi-lock"></i> block
    </button>
    <div className="vr"></div>
    <button type="button" className="btn btn-success" onClick={handleActivateUsers} disabled={selectedUsers.length === 0}>
      <i className="bi bi-unlock-fill"></i>
    </button>
    <div className="vr"></div>
    <button type="button" className="btn btn-dark" onClick={handleDeleteUsers} disabled={selectedUsers.length === 0}>
      <i className="bi bi-trash"></i>
    </button>
    <div className="vr"></div>
    <button type="button" className="btn btn-warning" onClick={handleSignout}>
      <i className="bi bi-box-arrow-right"></i> sign out
    </button>
  </div>
</div>

      
      <table className='table table-hover border-dark mt-3'>
        <thead className='border-2'>
          <tr>
            <th scope='col'><input
          type="checkbox"
          className="form-check-input"
          id="checkbox-select-all"
          checked={selectedUsers.length === users.length}
          onChange={handleSelectAll}
        /></th>
            <th scope='col'>Id</th>
            <th scope='col'>Email</th>
            <th scope='col'>Full Name</th>
            <th scope='col'>Registration time</th>
            <th scope='col'>Last Login</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id={`checkbox-${user.id}`}
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleUserSelect(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
              <td>{user.createdDate}</td>
              <td>{user.lastLoginDate}</td>
              <td>
                {user.isActive ? (
                  <button type="button" className="btn btn-outline-success btn-sm rounded-pill" >active</button>
                ) : (
                  <button type="button" className="btn btn-outline-danger btn-sm rounded-pill" >blocked</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default UsersTable;
