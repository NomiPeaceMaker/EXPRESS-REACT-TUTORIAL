import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import AddTask from './AddTask';
import { setTasks } from '../redux/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';

function TaskList() {

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const { userId, token } = useSelector((state) => state.auth);

  useEffect(() => {
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
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h2>Your Tasks</h2>
        </div>
        <div className="card-body">
          {tasks.length > 0 ? (
            <ul className="list-group">
              {tasks.map((task) => (
                <li key={task.id} className="list-group-item">
                  {task.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted">No tasks available. Add a new task!</p>
          )}
        </div>
        <div className="card-footer text-center">
          <AddTask />
          <Link to="/" className="btn btn-danger mt-3">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TaskList;