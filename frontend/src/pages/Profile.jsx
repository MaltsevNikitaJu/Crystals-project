import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

const Profile = ({ setIsAuthenticated }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    const fetchOrdersAndProducts = async () => {
      try {
        const ordersResponse = await api.get("orders/user-orders");
        const productsResponse = await api.get("products/");

        const recentOrders = ordersResponse.data
          .slice(-10)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setOrders(recentOrders);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Ошибка при получении заказов и продуктов:", error);
      }
    };
    fetchOrdersAndProducts();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate("/");
  };

  const getProductName = (productId) => {
    const product = products.find((product) => product.id === productId);
    return product ? product.name : "Unknown Product";
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Личный кабинет
      </Typography>
      <Typography variant="body1" gutterBottom>
        Добро пожаловать в ваш личный кабинет.
      </Typography>
      <Button
        sx={{
          backgroundColor: "rgb(238, 217, 206)",
          borderRadius: "25px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          color: "#000000",
          textAlign: "center",
          whiteSpace: "nowrap",
          display: "flex",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "rgba(238, 217, 206, 0.8)",
          },
        }}
        onClick={handleLogout}
      >
        Выйти
      </Button>
      <Typography variant="h6" component="h2" gutterBottom>
        Ваши заказы
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item key={order.id} xs={12}>
            <Card>
              <CardContent
                style={{
                  display: "flex",
                  boxShadow: "3px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">Номер заказа: {order.id}</Typography>
                <div>
                  {order.items.map((item, index) => (
                    <Typography key={index} variant="body2">
                      {getProductName(item.product_id)} x {item.quantity}
                    </Typography>
                  ))}
                </div>
                <Typography variant="body2">
                  Дата:{" "}
                  {new Date(order.created_at).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </Typography>
                <Typography variant="body2">
                  Цена:{" "}
                  {order.items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}{" "}
                  руб.
                </Typography>
                <Typography variant="body2">Статус: {order.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Profile;
