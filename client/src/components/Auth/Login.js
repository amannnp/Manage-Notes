import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

function Login({ onShowSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem('token', token);
      window.location.href = '/';
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
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
        <Avatar
          sx={{
            bgcolor: '#1976d2',
            width: 64,
            height: 64,
            mb: 2,
            boxShadow: '0 4px 24px 0 rgba(25, 118, 210, 0.25)',
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 36 }} />
        </Avatar>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 800,
            letterSpacing: 1,
            color: '#1976d2',
            mb: 0.5,
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: 'text.secondary', mb: 2 }}
        >
          Sign in to your account
        </Typography>
        <Divider sx={{ width: '100%', mb: 2 }} />

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            autoFocus
            InputProps={{
              sx: { borderRadius: 2, bgcolor: 'rgba(255,255,255,0.85)' },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputProps={{
              sx: { borderRadius: 2, bgcolor: 'rgba(255,255,255,0.85)' },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: 700,
              fontSize: '1.1rem',
              letterSpacing: 0.5,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
              transition: 'background 0.2s, box-shadow 0.2s',
              '&:hover': {
                backgroundColor: '#1565c0',
                boxShadow: '0 4px 16px rgba(25, 118, 210, 0.15)',
              },
            }}
          >
            LOGIN
          </Button>
        </form>

        {/* Sign up link as a button, triggers parent state */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: 'text.secondary' }}
        >
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onShowSignup}
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
            Sign up
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

export default Login;
