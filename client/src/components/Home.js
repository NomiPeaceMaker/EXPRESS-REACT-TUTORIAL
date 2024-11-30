import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { setTasks } from '../redux/tasksSlice';

const Home = () => {
    const dispatch = useDispatch();
    dispatch(logout()); // Clear auth state
    console.log("setting tasks to []")
    dispatch(setTasks([]))
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Task Manager</h1>
      <p>Organize your tasks efficiently and stay on top of your schedule.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/register">
          <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Register</button>
        </Link>
        <Link to="/login">
          <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;