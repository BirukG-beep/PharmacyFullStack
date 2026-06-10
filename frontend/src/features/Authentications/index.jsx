import React, { useState } from 'react'; 
import { Container, Form, Input, Button, I } from './styleLoginForm.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading.jsx';
import {userHook} from "./hooks/userHook.js";

import { useTheme } from '../../hooks/useTheme.js';

export { useTheme };

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

   const { login, loading } = userHook();

     const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };


  return (
    <Container>
      {loading ? (
        <Loading className='loading'/> // Show loading component
      ) : (
        <Form onSubmit={handleSubmit}>
          <I src='./Logo.png' alt='Logo' />
          <Input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={handleUsernameChange}
          />
          <Input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type='submit'>Login</Button>
        </Form>
      )}
      <ToastContainer />
    </Container>
  );
};

export default LoginForm;
