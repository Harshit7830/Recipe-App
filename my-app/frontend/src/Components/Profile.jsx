import React from 'react';
import { useAuth } from '../AuthContext';
import '../App.css'

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.gmail}</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
