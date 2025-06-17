import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const COLOR_OPTIONS = [
  { name: 'Yellow', value: '#fff9c4' },
  { name: 'Blue', value: '#bbdefb' },
  { name: 'Green', value: '#c8e6c9' },
  { name: 'Pink', value: '#f8bbd0' },
  { name: 'Orange', value: '#ffe0b2' },
  { name: 'Purple', value: '#e1bee7' }
];

function NoteForm({ onSubmit, note = null, onCancel }) {
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState(note ? note.heading : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [color, setColor] = useState(note ? note.color : COLOR_OPTIONS[0].value);

  // Open modal for edit or on button click
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (onCancel) onCancel();
  };

  // For editing, open immediately
  React.useEffect(() => {
    if (note) setOpen(true);
  }, [note]);

const handleSubmit = (e) => {
  e.preventDefault();
  if (!heading.trim() && !content.trim()) return;
  onSubmit({heading, content, color, _id: note?._id }); 
  setHeading('');
  setContent('');
  setColor(COLOR_OPTIONS[0].value);
  setOpen(false);
};
  return (
    <>
      {/* Floating Add Note Button */}
      {!note && (
        <Tooltip title="Add Note">
          <IconButton
            color="primary"
            onClick={handleOpen}
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              zIndex: 2000,
              bgcolor: 'white',
              boxShadow: '0 4px 24px rgba(25, 118, 210, 0.15)',
              '&:hover': { bgcolor: '#e3f2fd' }
            }}
            size="large"
          >
            <AddCircleIcon sx={{ fontSize: 48 }} />
          </IconButton>
        </Tooltip>
      )}

      {/* Modal for Note Entry */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: color, fontWeight: 700 }}>
          {note ? 'Edit Note' : 'Add Note'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ bgcolor: color }}>
            <TextField
              label="Heading"
              value={heading}
              onChange={e => setHeading(e.target.value)}
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 60 }}
              sx={{ fontWeight: 700 }}
            />
            <TextField
              label="Type your note here..."
              value={content}
              onChange={e => setContent(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              minRows={4}
            />
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <TextField
                select
                label="Color"
                value={color}
                onChange={e => setColor(e.target.value)}
                sx={{ minWidth: 120 }}
              >
                {COLOR_OPTIONS.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>
                    <Box
                      sx={{
                        display: 'inline-block',
                        width: 20,
                        height: 20,
                        bgcolor: opt.value,
                        borderRadius: '50%',
                        mr: 1,
                        border: '1px solid #ccc'
                      }}
                    />
                    {opt.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions sx={{ bgcolor: color }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {note ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default NoteForm;
