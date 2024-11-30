import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import AddTask from './AddTask';
import { setTasks } from '../redux/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';

function TaskList() {

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  let userId = localStorage.getItem('userId')

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    api.get(`/tasks/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        dispatch(setTasks(response.data))
      })
      .catch((error) => console.error('Error fetching tasks:', error));
    console.log(tasks)
  }, [dispatch]);

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <AddTask />
      <Link to="/">
        <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Logout</button>
      </Link>
    </div>
  );
}

export default TaskList;