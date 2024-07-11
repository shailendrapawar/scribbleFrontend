import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API_URL=JSON.stringify(import.meta.env.VITE_API_URL)
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

  @media (max-width: 768px) {
    padding: 1.5em;
  }
`;

const Title = styled.h1`
  margin-bottom: 1em;
`;

const Input = styled.input`
  width: calc(100% - 2em);
  padding: 0.5em;
  margin: 0.5em 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: calc(100% - 2em);
  padding: 0.5em;
  margin: 1em 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
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


const[email, setEmail]=useState("")
const[password,setPassword]=useState("")
const userData={
  email,password
}

const handleLogin=async(e)=>{
  console.log(API_URL)
  e.preventDefault()
  const res=await axios.post(`${API_URL}/login`,
    userData
  )
  console.log(res)
}

  return(
    <>
    <Container>
    <LoginForm >
      <Title  className='text-black text-2xl font-semibold'>Login</Title>
      <Input  value={email} onChange={(e)=>{
        setEmail(e.target.value)
      }} className=' outline-none' type="email" placeholder="Enter Email" />
      <Input value={password} onChange={(e)=>{
        setPassword(e.target.value)
      }}  className=' outline-none' type="password" placeholder="Enter Password" />
      <Button onClick={(e)=>{
        handleLogin(e)
      }} >Login</Button>
      <StyledLink to="/register">new here? Register</StyledLink>
    </LoginForm>
  </Container>
    </>
  )
}

export default Login;
