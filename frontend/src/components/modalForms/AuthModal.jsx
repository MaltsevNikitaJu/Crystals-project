import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ open, onClose, setIsAuthenticated,setIsAdmin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await api.post('auth/login', { email, password });
      } else {
        response = await api.post('auth/register', { name, email, password });
      }
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const roles = tokenPayload.roles || [];
      setIsAdmin(roles.includes('admin'));
      
      onClose();
      navigate('/');
    } catch (error) {
      console.error('Auth failed', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" component="h2">
          {isLogin ? 'Вход' : 'Регистрация'}
        </Typography>
        {!isLogin && (
          <TextField
            margin="normal"
            required
            fullWidth
            label="Имя"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          label="Электронная почта"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Пароль"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </Button>
        <Button fullWidth onClick={handleSwitch}>
          {isLogin ? 'Нет аккаунта? Зарегистрируйтесь сейчас' : 'Уже есть аккаунт? Войдите в него'}
        </Button>
      </Box>
    </Modal>
  );
};

export default AuthModal;
