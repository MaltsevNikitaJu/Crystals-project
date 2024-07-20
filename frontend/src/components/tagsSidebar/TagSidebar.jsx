import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { Instagram } from "@mui/icons-material";
import RecommendIcon from "@mui/icons-material/Recommend";

const SidebarContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  left: 10,
  top: 50,
  width: "230px",
  height: "calc(100vh - 100px)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "rgb(155, 153, 123)",
  borderRadius: "40px",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "50px",
  overflowY: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  [theme.breakpoints.down("md")]: {
    width: "200px",
    left: 5,
    top: 40,
    padding: theme.spacing(1),
    marginTop: "40px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "150px",
    left: 5,
    top: 30,
    padding: theme.spacing(0.5),
    marginTop: "30px",
  },
}));

const Tag = styled(ListItem)(({ theme, selected }) => ({
  cursor: "pointer",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  color: "white",
  borderRadius: "10px",
  backgroundColor: selected ? "rgba(238, 217, 206, 0.8)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(238, 217, 206, 0.6)",
  },
  "& .MuiListItemText-primary": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.5),
    "& .MuiListItemText-primary": {
      fontSize: "1.2rem",
    },
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(0.25),
    "& .MuiListItemText-primary": {
      fontSize: "1rem",
    },
  },
}));

const tags = [
  "БЕЗ орехов",
  "БЕЗ сахара",
  "БЕЗ цитрусовых",
  "БЕЗ шоколада",
  "Веганские",
  "ПП",
  "Шоколадные",
  "Ягодные",
];

const TagSidebar = ({ selectedTags, onTagToggle }) => {
  const handleToggle = (tag) => {
    onTagToggle(tag);
  };

  return (
    <SidebarContainer>
      <Typography variant="h4" sx={{ fontSize: "2rem", color: "white" }}>
        Блюда
      </Typography>
      <List sx={{ width: "100%" }}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            selected={selectedTags.includes(tag) ? 1 : 0}
            onClick={() => handleToggle(tag)}
          >
            <ListItemText primary={tag} />
          </Tag>
        ))}
      </List>
      <Typography
        variant="h4"
        sx={{ fontSize: "2rem", marginTop: "1rem", color: "white" }}
      >
        Мы
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Button
          variant="contained"
          startIcon={<RecommendIcon />}
          sx={{
            marginBottom: "1rem",
            width: "100%",
            backgroundColor: "blue",
            color: "white",
            fontSize: "0.8rem",
          }}
          href="https://vk.com/crystals_tmn"
          target="_blank"
        >
          Вконтакте
        </Button>
        <Button
          variant="contained"
          startIcon={<Instagram />}
          sx={{
            marginBottom: "1rem",
            width: "100%",
            backgroundColor: "purple",
            color: "white",
            fontSize: "0.8rem",
          }}
          href="https://www.instagram.com/crystals.tmn/"
          target="_blank"
        >
          Instagram
        </Button>
      </Box>
    </SidebarContainer>
  );
};

export default TagSidebar;
