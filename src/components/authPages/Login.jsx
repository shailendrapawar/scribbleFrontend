import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { } from 'react-router-dom'
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LoginForm = styled.div`
  background: white;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
position:relative
  @media (max-width: 768px) {
    padding: 1.5em;
  }
`;

const Title = styled.h1`
  margin-bottom: 1em;
`;

const Input = styled.input`
  width: calc(100% - 0.5em);
  padding: 0.5em;
  margin: 0.5em 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color:black;
  color:white;
`;


const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  margin-top: 0.5em;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {


  useEffect(()=>{
    localStorage.removeItem("SCIBBLE_USER_ID")
    
  },[])

  const naviagte = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const userData = {
    email, password
  }


  const validate = () => {
    if (email == '') {
      setError("enter email");
      return false
    }
    else if (password == '') {
      setError("enter password")
      return false
    }
    return true;
  }


  const handleLogin = async (e) => {
    e.preventDefault()

    const isValid = validate()

    if (isValid) {
      const res = await axios.post(import.meta.env.VITE_API_URL+"/login", userData);

      //if user exists 
      if (res.data.status == 200) {
        setError(res.data.msg)
        localStorage.setItem("SCRIBBLE_USER_ID",res.data.id)
        setTimeout(() => {
          naviagte("/userProfile")
        }, 1000)
      }

      //if user dosent
      else {
        setError(res.data.msg)
        setPassword("")
        setTimeout(() => {
          setError("")
        }, 3000)
      }

    } else {
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }

  return (
    <>
      <Container>
        <LoginForm>
          <Title className='text-black text-2xl font-semibold'>Login</Title>
          <p className='text-red-600 h-6' >{error}</p>
          <Input value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} className=' outline-none' type="email" placeholder="Enter Email" />
          <Input value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} className=' outline-none' type="password" placeholder="Enter Password" />
          <StyledLink to="/register">new here? Register</StyledLink>
          <button onClick={(e) => {
            handleLogin(e)
          }} className=' w-32 h-10 ml-10 mt-2  bg-blue-600 rounded-md'>LOGIN</button>
        </LoginForm>
      </Container>
    </>
  )
}

export default Login;
