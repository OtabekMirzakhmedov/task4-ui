import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UsersTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get('https://localhost:7001/api/User');
            setUsers(response.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchUsers();
      }, []);


  return (
    <div>
        <h2>User List</h2>
        <ul>
            {users.map((user) => (
            <li key={user.id}>{user.id} - {user.fullName}</li>
            ))}
        </ul>
      
    </div>
  )
}

export default UsersTable;
