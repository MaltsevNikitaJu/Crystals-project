import { Button, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgb(238, 217, 206)',
  borderRadius: '25px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  color: '#000000',
  margin: theme.spacing(1),
  padding: theme.spacing(1, 3),
  textAlign: 'center',
  whiteSpace: 'nowrap',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: 'rgba(238, 217, 206, 0.8)',
  },
}));

const CategoryButton = ({ children, isAdmin, onEdit, onDelete, ...props }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-block', width: '100%', marginTop: '15px' }}>
      <StyledButton {...props}>
        {children}
      </StyledButton>
      {isAdmin && (
        <Box sx={{ position: 'absolute', top: -10, right: -10, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size="small" onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default CategoryButton;