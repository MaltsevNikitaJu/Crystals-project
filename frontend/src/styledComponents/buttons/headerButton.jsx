import { Button } from '@mui/material';
import { styled } from '@mui/system';

const HeaderButton = styled(Button)(({ theme }) => ({
  color: '#000000',
  backgroundColor: 'rgb(250, 248, 246)',
  borderRadius: '25px',
  marginRight: theme.spacing(1),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
}));

export default HeaderButton;
