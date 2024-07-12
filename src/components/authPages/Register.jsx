import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {} from 'react-router-dom'
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Form = styled.div`
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

const Register = () => {

  const navigate=useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const validate = () => {

    if (name == "") {
      setError("enter name")
      return false
    }
    if (email == "") {
      setError("enter email")
      return false
    }

    if (number == "") {
      setError("enter number")
      return false
    }

    if (password == "") {
      setError("enter password")
      return false
    }
    setError("")
    return true

  }

  const handleRegister = async () => {
    const isValid = validate()
    if (isValid) {
      const userData = {
        email, name, number, password
      }

      const res = await axios.post(import.meta.env.VITE_API_URL + "/register", userData)

      setError("")

      if (res.data.status == 200) {
        setError(res.data.msg)
        navigate("/login")
        
      } else {

        setError(res.data.msg)
        setEmail("")
        setPassword("")
        setTimeout(() => {
          setError("")

        }, 3000)
      }

    } else {

    }

  }

  return (
    <Container>
      <Form>
        <Title className='text-black text-2xl font-semibold'>Register</Title>
        <p className='text-red-600 h-5 mb-2'>{error}</p>
        <Input value={name} onChange={(e) => setName(e.target.value)} className=' outline-none' type="text" placeholder="Enter Name" />
        <Input value={number} onChange={(e) => setNumber(e.target.value)} className=' outline-none' type="text" placeholder="Enter Number" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} className=' outline-none' type="email" placeholder="Enter Email" />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} className=' outline-none' type="password" placeholder="Enter Password" />
        <Button onClick={(e) => handleRegister(e)}>Register</Button>
        <StyledLink to="/login">already user? Login</StyledLink>
      </Form>
    </Container>
  );
}

export default Register;
