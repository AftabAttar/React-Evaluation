import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';

const Login = () => {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('API_LOGIN_ENDPOINT', { email, password });
      login(email, response.data.token);
      history.push('/home');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <Input
            ref={emailRef}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Text color="red.500">{error}</Text>}
          <Button type="submit" colorScheme="teal">Login</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
