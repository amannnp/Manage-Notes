import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup({ onShowLogin }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setLoading(false);
      navigate('/dashboard'); // or wherever you want to redirect
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
        position: 'relative',
      }}
    >
      <Paper
        elevation={12}
        sx={{
          px: { xs: 3, sm: 6 },
          py: { xs: 4, sm: 6 },
          borderRadius: 5,
          minWidth: { xs: '90vw', sm: 400 },
          maxWidth: 420,
          width: '100%',
          bgcolor: 'rgba(255,255,255,0.7)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" mb={3} textAlign="center" sx={{ fontWeight: 800, color: '#1976d2' }}>
          Sign Up
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
        <form onSubmit={handleSignup} style={{ width: '100%' }}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2, py: 1.5, fontWeight: 700, fontSize: '1.1rem', borderRadius: 2 }}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
        {/* Log in link as a button, triggers parent state */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: 'text.secondary' }}
        >
          Already have an account?{' '}
          <button
            type="button"
            onClick={onShowLogin}
            style={{
              color: '#1976d2',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              textDecoration: 'underline',
              font: 'inherit',
              padding: 0,
            }}
          >
            Log in
          </button>
        </Typography>
      </Paper>
      {/* Footer at the bottom of the viewport */}
      <Box
        component="footer"
        sx={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100vw',
          py: 1,
          bgcolor: 'transparent',
          textAlign: 'center',
          zIndex: 100,
          color: '#222',
          fontSize: '1rem',
          letterSpacing: 0.5,
          fontWeight: 400,
          userSelect: 'none',
        }}
      >
        By Aman Pandey | 2025
      </Box>
    </Box>
  );
}

export default Signup;
