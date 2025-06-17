import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Fade,
  IconButton,
  Tooltip,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import SearchBar from './SearchBar';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';

const NotesDashboard = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchNotes = useCallback(() => {
    axios
      .get('https://manage-notes.onrender.com/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setNotes(res.data))
      .catch(() => {
        setSnackbar({ open: true, message: 'Failed to load notes.', severity: 'error' });
      });
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token, fetchNotes]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleCreate = async (note) => {
     console.log("Note being sent to backend:", note);
    try {
      const res = await axios.post('https://manage-notes.onrender.com/api/notes', note, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes([res.data, ...notes]);
      setSnackbar({ open: true, message: 'Note added!', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to add note.', severity: 'error' });
    }
  };

  const handleUpdate = async (note) => {
    console.log("Note being updated:", note);
    try {
      const res = await axios.put(`https://manage-notes.onrender.com/api/notes/${note._id}`, note, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.map(n => (n._id === note._id ? res.data : n)));
      setEditingNote(null);
      setSnackbar({ open: true, message: 'Note updated!', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to update note.', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://manage-notes.onrender.com/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter(n => n._id !== id));
      setSnackbar({ open: true, message: 'Note deleted.', severity: 'info' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete note.', severity: 'error' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredNotes = notes.filter(note =>
    (note.heading || '').toLowerCase().includes(search.toLowerCase()) ||
    (note.content || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 6,
      }}
    >
      <Fade in>
        <Paper
          elevation={12}
          sx={{
            width: { xs: '95vw', md: '80vw', lg: '70vw' },
            maxWidth: 1200,
            minHeight: 700,
            borderRadius: 5,
            p: { xs: 2, sm: 4 },
            bgcolor: 'rgba(255,255,255,0.8)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <Tooltip title="Logout">
              <IconButton onClick={handleLogout} color="error">
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 800,
              color: '#1976d2',
              mb: 2,
            }}
          >
            My Notes
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mb: 3, gap: 2 }}>
            <Box sx={{ flex: 2 }}>
              <SearchBar search={search} setSearch={setSearch} />
            </Box>
          </Box>

          <Grid
            container
            spacing={3}
            sx={{
              mt: 1,
              justifyContent: filteredNotes.length ? 'flex-start' : 'center',
            }}
            className="notes-grid"
          >
            {filteredNotes.length ? (
              filteredNotes.map(note => (
                <Grid item xs={12} sm={6} md={4} key={note._id}>
                  <Box
                    sx={{
                      transition: 'box-shadow 0.2s, transform 0.2s',
                      boxShadow: '0 2px 16px rgba(25, 118, 210, 0.08)',
                      borderRadius: 3,
                      '&:hover': {
                        boxShadow: '0 8px 32px rgba(25, 118, 210, 0.16)',
                        transform: 'translateY(-4px) scale(1.015)',
                      },
                    }}
                  >
                    <NoteCard
                      note={note}
                      onEdit={() => setEditingNote(note)}
                      onDelete={() => handleDelete(note._id)}
                    />
                  </Box>
                </Grid>
              ))
            ) : (
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mt: 8, mx: 'auto', opacity: 0.6 }}
              >
                No notes found.
              </Typography>
            )}
          </Grid>
        </Paper>
      </Fade>

      <NoteForm onSubmit={handleCreate} />

      {editingNote && (
        <NoteForm
          note={editingNote}
          onSubmit={handleUpdate}
          onCancel={() => setEditingNote(null)}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box
        component="footer"
        sx={{
          mt: 4,
          color: '#444',
          fontSize: '1rem',
          letterSpacing: 0.5,
          fontWeight: 400,
          opacity: 0.7,
        }}
      >
        By Aman Pandey | 2025
      </Box>
    </Box>
  );
};

export default NotesDashboard;
