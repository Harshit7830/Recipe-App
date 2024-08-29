import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Authprovider'; // Verify this path is correct
import '../App.css'; // Verify the correct path to your CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // State to minimize navbar

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className={`nav ${isMinimized ? 'minimized' : ''}`}>
        <div className="left">
          <img src='/spoon_12973450.png' alt="logo" className="logo2" />
          <h1>Recipe</h1>
        </div>
        <div className="search">
         
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              value={input}
              placeholder=''
            />
          </form>
        </div>
        <div className="right">
          <Link to={`/Category/indian`} className='link'>
            <div>Indian</div>
          </Link>
          <Link to={`/Category/american`} className='link'>
            <div>American</div>
          </Link>
          <Link to={`/Category/British`} className='link'>
            <div>British</div>
          </Link>
          <Link to={`/Category/chinese`} className='link'>
            <div>Chinese</div>
          </Link>
          {isAuthenticated ? (
            <div className="profile-dropdown">
              <div onClick={() => {
                setShowProfile(!showProfile);
                setIsMinimized(!isMinimized); 
              }} style={{ cursor: 'pointer' }}>
                Welcome, {user?.name}
              </div>
              {showProfile && (
                <div className="profile-menu">
                  <div>User Name: {user?.name}</div>
                  
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
