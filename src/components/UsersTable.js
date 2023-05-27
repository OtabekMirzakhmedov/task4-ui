import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const UsersTable = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!auth.user) {
      // User is not authenticated, redirect to login page
      return <Navigate to="/" />;
    }
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/User');
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);



  if (isLoading) {
    // Show loading indicator while fetching data
    return <p>Loading...</p>;
  }

  if (error) {
    // Handle error during data fetching
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} - {user.fullName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersTable;
