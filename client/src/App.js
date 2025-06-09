import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AuthPage from './components/Auth/AuthPage';
import NotesDashboard from './components/Notes/NotesDashboard';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* If user is logged in, redirect /auth to dashboard */}
        <Route
          path="/auth"
          element={isLoggedIn ? <Navigate to="/" /> : <AuthPage />}
        />
        
        {/* /login just redirects to /auth */}
        <Route path="/login" element={<Navigate to="/auth" />} />

        {/* Root route - protected */}
        <Route
          path="/"
          element={isLoggedIn ? <NotesDashboard /> : <Navigate to="/auth" />}
        />

        {/* Catch-all redirect to root */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/auth"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
