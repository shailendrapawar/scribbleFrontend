import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const Register = () => (
  <Container>
    <Form>
      <Title className='text-black text-2xl font-semibold'>Register</Title>
      <Input className=' outline-none' type="text" placeholder="Enter Name" />
      <Input className=' outline-none' type="text" placeholder="Enter Number" />
      <Input className=' outline-none' type="email" placeholder="Enter Email" />
      <Input className=' outline-none' type="password" placeholder="Enter Password" />
      <Button>Register</Button>
      <StyledLink to="/login">already user? Login</StyledLink>
    </Form>
  </Container>
);

export default Register;
