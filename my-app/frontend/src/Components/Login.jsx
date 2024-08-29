import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../Authprovider';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const result = await login(gmail, password);

      if (result && result.data.token) {
        toast.success(result.data.message || "User login successfully");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      toast.error(error.message || "Wrong email or password.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <ToastContainer />
        <form onSubmit={handleLogin}>
          <img src='/spoon_12973450.png' alt="logo" className="logo" />
          <h2>Login</h2>
          <div className="input-box">
            <input
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              required
            />
            <label>Gmail</label>
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label>Show Password</label>
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
