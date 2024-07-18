import React,{useEffect} from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

const Profile = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Личный кабинет
      </Typography>
      <Typography variant="body1" gutterBottom>
        Добро пожаловать в ваш личный кабинет.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Выйти
      </Button>
    </Container>
  );
};

export default Profile;

