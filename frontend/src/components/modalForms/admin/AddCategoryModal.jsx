import React, { useState } from "react";
import { Modal, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ModalBox,
  Title,
  TextFieldStyled,
  SubmitButton,
} from "./AddProductModalStyles";

const AddCategoryModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const categoryData = {
      name,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/categories", categoryData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      handleClose();
      navigate("/");
    } catch (error) {
      console.error("Ошибка при добавлении категории", error);
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
          <Title>Добавить категорию</Title>
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
          <SubmitButton
            type="submit"
            sx={{
              backgroundColor: "rgb(238, 217, 206)",
              borderRadius: "25px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              color: "#000000",
              textAlign: "center",
              whiteSpace: "nowrap",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "rgba(238, 217, 206, 0.8)",
              },
            }}
          >
            Сохранить
          </SubmitButton>
        </ModalBox>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
