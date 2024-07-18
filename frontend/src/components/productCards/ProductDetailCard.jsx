import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, Box, Button, Table, TableBody, TableCell, TableRow } from '@mui/material';

const ProductDetailCard = ({ product, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth >
      <DialogTitle sx= {{backgroundColor: '#D8C1B4'}}>{product.name}</DialogTitle>
      <DialogContent sx ={{backgroundColor: "#faf8f6"}}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <img src={product.image_url} alt={product.name} style={{ width: '100%', borderRadius: '8px' }} />
          </Box>
          <Box sx={{ flex: 2 }}>
            <Typography variant="h5" gutterBottom>Описание</Typography>
            <Typography paragraph>{product.description}</Typography>
            <Typography variant="h5" gutterBottom>Состав</Typography>
            <Typography paragraph>{product.composition}</Typography>
            <Typography variant="h5" gutterBottom>Пищевая ценность на 100 г</Typography>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Ккал</TableCell>
                  <TableCell>Белки</TableCell>
                  <TableCell>Жиры</TableCell>
                  <TableCell>Углеводы</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{product.calories}</TableCell>
                  <TableCell>{product.protein}</TableCell>
                  <TableCell>{product.fat}</TableCell>
                  <TableCell>{product.carbohydrates}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Масса: {product.mass} г</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <Typography variant="h5">{product.price} ₽</Typography>
              <Button variant="contained" color="primary">Купить</Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailCard;
