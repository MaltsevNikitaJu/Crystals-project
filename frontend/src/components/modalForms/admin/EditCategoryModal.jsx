import React, { useState, useEffect } from "react";
import { Modal, Typography, TextField, Button } from "@mui/material";
import api from "../../../api/api";
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

      await api.put(`categories/${category.id}`, categoryData, );
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
