import React, { useState, useEffect } from "react";
import {
  Modal,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";
import {
  ModalBox,
  Title,
  TextFieldStyled,
  CheckBoxGroup,
  ImagePreview,
  SubmitButton,
  SelectField,
} from "./AddProductModalStyles";

const tagOptions = [
  "без орехов",
  "без сахара",
  "без цитрусовых",
  "без шоколада",
  "веганские",
  "ПП",
  "шоколадные",
  "ягодные",
];

const AddProductModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");
  const [calories, setCalories] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [composition, setComposition] = useState("");
  const [tags, setTags] = useState([]);
  const [mass, setMass] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке категорий", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl("");
      setImagePreview(null);
    }
  };

  const handleTagChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setTags((prevTags) => [...prevTags, value]);
    } else {
      setTags((prevTags) => prevTags.filter((tag) => tag !== value));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!categoryId) {
      alert("Пожалуйста, выберите категорию.");
      return;
    }

    const productData = {
      name,
      description,
      price,
      stock,
      image_url: imageUrl,
      protein,
      fat,
      carbohydrates,
      calories,
      category_id: parseInt(categoryId, 10),
      composition,
      tags: tags.join(","),
      mass,
    };

    try {
      await api.post("products", productData);
      handleClose();
      navigate("/");
    } catch (error) {
      console.error("Ошибка при добавлении продукта", error);
    }
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setImageUrl("");
    setProtein("");
    setFat("");
    setCarbohydrates("");
    setCalories("");
    setCategoryId("");
    setComposition("");
    setTags([]);
    setMass("");
    setImagePreview(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <ModalBox>
          <Title>Добавить продукт</Title>
          {imagePreview && (
            <ImagePreview src={imagePreview} alt="Превью изображения" />
          )}
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
          <TextFieldStyled>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </TextFieldStyled>
          <TextFieldStyled>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Цена"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </TextFieldStyled>
          <TextFieldStyled>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Количество"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </TextFieldStyled>
          <TextFieldStyled>
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ margin: "20px 0" }}
            />
          </TextFieldStyled>
          <TextFieldStyled>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Белки"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
            />
          </TextFieldStyled>
          <TextFieldStyled>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Жиры"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
            />
          </TextFieldStyled>
          <TextFieldStyled>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Углеводы"
              value={carbohydrates}
              onChange={(e) => setCarbohydrates(e.target.value)}
            />
          </TextFieldStyled>
          <TextFieldStyled>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Калории"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </TextFieldStyled>
          <TextFieldStyled>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Масса нетто"
              value={mass}
              onChange={(e) => setMass(e.target.value)}
            />
          </TextFieldStyled>
          <SelectField>
            <FormControl fullWidth margin="normal">
              <InputLabel id="category-select-label">Категория</InputLabel>
              <Select
                labelId="category-select-label"
                value={categoryId}
                label="Категория"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </SelectField>
          <TextFieldStyled>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Состав"
              value={composition}
              onChange={(e) => setComposition(e.target.value)}
            />
          </TextFieldStyled>
          <CheckBoxGroup>
            {tagOptions.map((tag) => (
              <FormControlLabel
                key={tag}
                control={<Checkbox value={tag} onChange={handleTagChange} />}
                label={tag}
              />
            ))}
          </CheckBoxGroup>
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

export default AddProductModal;
