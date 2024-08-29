import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import { useAuth } from '../Authprovider';

const Register = () => {
  const{ register } =useAuth();
  const navigate = useNavigate();
  const [gmail, setGmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!specialCharRegex.test(password)) {
      toast.error("Password must include at least one upper case latter");
      return;
    }

    try {
      const result = await register(name, gmail, password);
      toast.success(result.data.message || "User registered successfully");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <ToastContainer />
        <form onSubmit={handleRegister}>
          <img src='/spoon_12973450.png' alt="logo" className="logo" />
          <h2>Register</h2>
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
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Username</label>
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
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label>Confirm Password</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label>Show Password</label>
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
