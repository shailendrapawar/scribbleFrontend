// WelcomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

const Welcome = () => {
  const [user,setUser]=useState(false);
 

  useEffect(()=>{
    const userId=localStorage.getItem("SCRIBBLE_USER_ID");

    if(userId){
      setUser(true)
    }else{
      setUser(false)
    }
  },[])

  
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Todo/Note App</h1>
      <p className="welcome-description">Organize your tasks and take notes efficiently.</p>
      <Link to={user?`/userProfile`:`/login`} className="get-started-button">Get Started</Link>
    </div>
  );
};

export default Welcome;
