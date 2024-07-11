// WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Todo/Note App</h1>
      <p className="welcome-description">Organize your tasks and take notes efficiently.</p>
      <Link to="/login" className="get-started-button">Get Started</Link>
    </div>
  );
};

export default Welcome;
