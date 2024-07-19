import React, { useState } from "react";
import { Modal, TextField } from "@mui/material";
import api from "../../../api/api";
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
      await api.post("categories", categoryData, {
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
          <Title sx={{marginTop: '0px'}}>Добавить категорию</Title>
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
              cursor: "pointer",
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
