import React from 'react';
import Home from './Components/Home';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recipeid from './Components/Recipeid';
import Category from './Components/Category';
import Searchelement from './Components/Searchelement';
import Login from './Components/Login';
import Register from './Components/Register';
import { AuthProvider } from './Authprovider.js'; // Ensure the correct path

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/:idMeal" element={<Recipeid />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/search/:searchTerm" element={<Searchelement />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
