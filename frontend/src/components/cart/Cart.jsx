import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import api from "../../api/api";
import SmallProductCard from "../productCards/SmallProductCard";
import ProductDetailCard from "../productCards/ProductDetailCard";

const Cart = ({ open, onClose, isAuthenticated }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetailOpen, setProductDetailOpen] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get("cart");
        const items = response.data.items;
        setCartItems(items);
        setTotalPrice(
          items.reduce((total, item) => total + item.price * item.quantity, 0)
        );
      } catch (error) {
        console.error("Ошибка при получении товаров корзины:", error);
      }
    };

    if (open && isAuthenticated) {
      fetchCartItems();
    }
  }, [open, isAuthenticated]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductDetailOpen(true);
  };

  const handleProductDetailClose = () => {
    setProductDetailOpen(false);
    setSelectedProduct(null);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await api.post("cart/update", { productId, quantity: newQuantity });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      const updatedTotalPrice = cartItems.reduce((total, item) => {
        if (item.product_id === productId) {
          return total + item.price * newQuantity;
        }
        return total + item.price * item.quantity;
      }, 0);
      setTotalPrice(updatedTotalPrice);
    } catch (error) {
      console.error(
        "Ошибка при обновлении количества товара в корзине:",
        error
      );
    }
  };
  const handlePaymentLink = async () => {
    try {
      const response = await api.post("orders/pay");
      const { confirmation_url, paymentId, value } = response.data;

      if (confirmation_url) {
        window.open(confirmation_url, "YooKassa", "width=800,height=500");
      } else {
        console.error("Ссылка для оплаты не получена");
      }
      setInterval(async () => {
        const setPayment = await api.post(`orders/pay/catch/${paymentId}`, {
          value: value,
        });
        if (setPayment.status === 201){
          const setStatus = await api.post(`orders/pay/status/${paymentId}`, {
            status: "success",
          });
        } else {
          const setStatus = await api.post(`orders/pay/status/${paymentId}`, {
            status: "canceled",
          });
        }
      }, 6000);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await api.post("cart/remove", { productId });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product_id !== productId)
      );
      const updatedTotalPrice = cartItems.reduce((total, item) => {
        if (item.product_id !== productId) {
          return total + item.price * item.quantity;
        }
        return total;
      }, 0);
      setTotalPrice(updatedTotalPrice);
    } catch (error) {
      console.error("Ошибка при удалении товара из корзины:", error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ background: "#D8C1B4" }}>Корзина</DialogTitle>
        <Grid sx={{ background: "rgb(250, 248, 246)" }}>
          <DialogContent>
            {!isAuthenticated ? (
              <Typography>
                Пожалуйста, войдите или зарегистрируйтесь, чтобы добавить товары
                в корзину.
              </Typography>
            ) : (
              <Box>
                {cartItems.map((item) => (
                  <SmallProductCard
                    key={item.product_id}
                    product={item}
                    onClick={handleProductClick}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </Box>
            )}
          </DialogContent>
          {isAuthenticated && (
            <>
              <Typography variant="h6" sx={{ textAlign: "right", mr: 3 }}>
                Итого: {totalPrice} ₽
              </Typography>
              <DialogActions sx={{ background: "rgb(250, 248, 246)" }}>
                <Button
                  sx={{ background: "#D8C1B4", color: "#000000" }}
                  onClick={handlePaymentLink}
                >
                  Купить
                </Button>
              </DialogActions>
            </>
          )}
        </Grid>
      </Dialog>
      {selectedProduct && (
        <ProductDetailCard
          product={selectedProduct}
          open={productDetailOpen}
          onClose={handleProductDetailClose}
        />
      )}
    </>
  );
};

export default Cart;
