import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

const SignInForm = ({ onSignInSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'selvarasan2004@gmail.com' && password === 'Selva#king@2004') {
      onSignInSuccess();
    } else {
      alert('Invalid Username and Password. Please try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6">Sign In</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        margin="normal"
      />
      <Button type="submit" variant="contained" color="secondary">Sign In</Button>
    </Box>
  );
};

export default SignInForm;
