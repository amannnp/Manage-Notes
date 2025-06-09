import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div
      className="centered-container"
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
      }}
    >
      <h1
        style={{
          color: '#1976d2',
          fontWeight: 800,
          fontSize: '2.7rem',
          letterSpacing: 1,
          marginBottom: '2rem',
          marginTop: 0,
          textShadow: '0 2px 8px rgba(25, 118, 210, 0.07)',
        }}
      >
        Save Your Notes
      </h1>
      <div className="auth-card">
        {showLogin ? (
          <Login onShowSignup={() => setShowLogin(false)} />
        ) : (
          <Signup onShowLogin={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  );
}

export default AuthPage;
