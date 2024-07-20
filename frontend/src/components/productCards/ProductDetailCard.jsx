import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import api from "../../api/api";

const ProductDetailCard = ({ product, open, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [message, setMessage] = useState("");

  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, quantity + amount);
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * product.price);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Вы должны войти в систему, чтобы добавить товары в корзину.");
      return;
    }
    try {
      await api.post("cart/add", { productId: product.id, quantity });
      setMessage("Товар успешно добавлен в корзину.");
    } catch (error) {
      console.error("Ошибка при добавлении товара в корзину:", error);
      setMessage("Ошибка при добавлении товара в корзину.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ backgroundColor: "#D8C1B4" }}>
        {product.name}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#faf8f6" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <img
              src={product.image_url}
              alt={product.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Box>
          <Box sx={{ flex: 2 }}>
            <Typography variant="h5" gutterBottom>
              Описание
            </Typography>
            <Typography paragraph>{product.description}</Typography>
            <Typography variant="h5" gutterBottom>
              Состав
            </Typography>
            <Typography paragraph>{product.composition}</Typography>
            <Typography variant="h5" gutterBottom>
              Пищевая ценность на 100 г
            </Typography>
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
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Масса: {product.mass} г
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              <Typography variant="h5">{totalPrice} ₽</Typography>
              <IconButton onClick={() => handleQuantityChange(-1)}>
                <RemoveIcon />
              </IconButton>
              <Typography>{quantity}</Typography>
              <IconButton onClick={() => handleQuantityChange(1)}>
                <AddIcon />
              </IconButton>
              <Button
                sx={{
                  ml: "auto",
                  backgroundColor: "rgba(238, 217, 206, 0.8)",
                  color: "black",
                }}
                onClick={handleAddToCart}
              >
                В корзину
              </Button>
            </Box>
            {message && (
              <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailCard;
