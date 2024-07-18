import { styled } from '@mui/system';

export const ModalBox = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxHeight: '90vh',
  overflowY: 'auto',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  padding: theme.spacing(4),
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
}));

export const Title = styled('h6')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: '1.5rem',
  color: '#333',
}));

export const TextFieldStyled = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& label': {
    fontSize: '0.875rem',
  },
  '& input': {
    fontSize: '0.875rem',
  },
}));

export const SelectField = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const CheckBoxGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
}));

export const SubmitButton = styled('button')(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#d8c1b4',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#c1a593',
  },
}));

export const ImagePreview = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  marginBottom: theme.spacing(2),
}));
