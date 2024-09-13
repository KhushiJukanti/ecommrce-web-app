import React, { useState, useContext } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateFormFields = () => {
    let errors = {};
    if (!username.trim()) {
      errors.username = "Please enter a valid username";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = validateFormFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Fetch users from the json-server
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data;

      // Check for valid user
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        login(user); // Save user context
        if (user.role === 'admin') {
          navigate('/admin'); // Navigate to admin dashboard
        } else {
          navigate('/home'); // Navigate to home page for normal users
        }
      } else {
        setErrors({ ...errors, form: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ ...errors, form: 'An error occurred during login. Please try again.' });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              {errors.form && <div className="alert alert-danger">{errors.form}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setErrors(prevErrors => ({ ...prevErrors, username: '' })); // Clear username error on change
                    }}
                  />
                  {errors.username && <div className="text-danger">{errors.username}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors(prevErrors => ({ ...prevErrors, password: '' })); // Clear password error on change
                    }}
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <p className="mt-3">
                Your not registered? <Link to="/register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
