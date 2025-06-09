import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const NoteCard = ({ note, onEdit, onDelete }) => (
  <Card sx={{ backgroundColor: note.color || '#fff' }}>
    <CardContent>
      <Typography variant="h6">{note.title}</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>{note.content}</Typography>
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={onEdit}><EditIcon /></IconButton>
        <IconButton onClick={onDelete}><DeleteIcon /></IconButton>
      </Box>
    </CardContent>
  </Card>
);

export default NoteCard;
