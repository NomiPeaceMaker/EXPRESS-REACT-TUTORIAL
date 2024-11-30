import React, { useState } from 'react';
import api from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      console.log('Sending request to backend...');
      const response = await api.post('/auth/register', { username, password });
      setMessage('User registered successfully!');
      console.log(response.data)

      const { userId, token } = response.data;
      dispatch(login({ userId, token })); // Dispatch login action
      navigate('/tasks')
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      setMessage('Failed to register user.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h1>Register</h1>
            </div>
            <div className="card-body">
              {message && (
                <div
                  className={`alert ${message.toLowerCase().includes('success') ? 'alert-success' : 'alert-danger'
                    }`}
                >
                  {message}
                </div>
              )}
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="text-primary">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;