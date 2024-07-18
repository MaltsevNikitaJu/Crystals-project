import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmDialog = ({ open, handleClose, handleConfirm, title, description }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Нет
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
