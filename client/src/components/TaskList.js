import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  let userId = localStorage.getItem('userId')
  console.log(localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    api.get(`/tasks/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, [userId]);

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <Link to="/">
        <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Logout</button>
      </Link>
    </div>
  );
}

export default TaskList;