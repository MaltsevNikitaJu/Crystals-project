import { TextField } from '@mui/material';
import { styled } from '@mui/system';

const SearchField = styled(TextField)(() => ({
  backgroundColor: 'rgb(250, 248, 246)',
  borderRadius: '25px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '300px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
}));

export default SearchField;
