import React from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

const SmallProductCard = ({ product, onClick, onQuantityChange, onRemove }) => {
  const handleQuantityChange = (event) => {
    const newQuantity = Math.max(1, parseInt(event.target.value, 10));
    onQuantityChange(product.product_id, newQuantity);
  };

  const handleIncrease = () => {
    onQuantityChange(product.product_id, product.quantity + 1);
  };

  const handleDecrease = () => {
    if (product.quantity > 1) {
      onQuantityChange(product.product_id, product.quantity - 1);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove(product.product_id);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderBottom: '1px solid #ddd', position: 'relative' }} onClick={() => onClick(product)}>
      <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={handleRemove}>
        <CloseIcon sx={{ color: '#000' }} />
      </IconButton>
      <Box sx={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '8px' }}>
        <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
      <Box sx={{ ml: 2, flex: 1, textAlign: 'center' }}>
        <Typography variant="h6">{product.name}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
        <IconButton onClick={(e) => {e.stopPropagation(); handleDecrease();}}><RemoveIcon /></IconButton>
        <TextField
          type="number"
          value={product.quantity}
          onChange={(e) => {e.stopPropagation(); handleQuantityChange(e);}}
          sx={{ width: '50px', mx: 1 }}
          inputProps={{ min: 1 }}
        />
        <IconButton onClick={(e) => {e.stopPropagation(); handleIncrease();}}><AddIcon /></IconButton>
      </Box>
      <Typography sx={{ minWidth: '100px', textAlign: 'right' }}>{product.price * product.quantity} ₽</Typography>
    </Box>
  );
};

export default SmallProductCard;
