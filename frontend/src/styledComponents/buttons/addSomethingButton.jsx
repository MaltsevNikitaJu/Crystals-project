import { Button } from '@mui/material';
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

export default StyledButton;