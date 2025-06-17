import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <Card sx={{ backgroundColor: note.color || '#fff' }}>
      <CardContent>
        <Typography variant="h6">{note.heading}</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>{note.content}</Typography>

        {/* Only Edit and Delete buttons */}
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={() => onEdit(note)}><EditIcon /></IconButton>
          <IconButton onClick={onDelete}><DeleteIcon /></IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
