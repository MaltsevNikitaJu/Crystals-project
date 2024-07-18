import React, { useState, useEffect } from "react";
import { Modal, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ModalBox, Title, TextFieldStyled, SubmitButton } from './AddProductModalStyles';

const EditCategoryModal = ({ open, onClose, category }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setName(category.name || "");
    }
  }, [category]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const categoryData = {
      name,
    };

    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/categories/${category.id}`, categoryData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      handleClose();
      navigate("/");
    } catch (error) {
      console.error("Ошибка при редактировании категории", error);
    }
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <ModalBox>
          <Title>Редактировать категорию</Title>
          <TextFieldStyled>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Название"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </TextFieldStyled>
          <SubmitButton type="submit">
            Сохранить
          </SubmitButton>
        </ModalBox>
      </form>
    </Modal>
  );
};

export default EditCategoryModal;
