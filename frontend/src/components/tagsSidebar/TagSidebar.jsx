import React from 'react';
import { List, ListItem, ListItemText, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Instagram } from '@mui/icons-material'; 
import RecommendIcon from '@mui/icons-material/Recommend';

const SidebarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  left: 10,
  top: 50,
  width: '250px',
  height: 'calc(100vh - 100px)',
  boxShadow: '4px 8px rgba(0.1)',
  backgroundColor: 'rgb(155, 153, 123)',
  borderRadius: '50px',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '50px',
}));

const Tag = styled(ListItem)(({ theme, selected }) => ({
  cursor: 'pointer',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  color: 'white',
  borderRadius: '20px',
  backgroundColor: selected ? 'rgba(238, 217, 206, 0.8)' : 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(238, 217, 206, 0.6)',
  },
  '& .MuiListItemText-primary': {
    fontSize: '1.5rem',
  },
}));

const tags = ["БЕЗ орехов", "БЕЗ сахара", "БЕЗ цитрусовых", "БЕЗ шоколада", "Веганские", "ПП", "Шоколадные", "Ягодные"];

const TagSidebar = ({ selectedTags, onTagToggle }) => {
  const handleToggle = (tag) => {
    onTagToggle(tag);
  };

  return (
    <SidebarContainer sx={{
      display: "flex",
    }}>
      <Typography variant="h4" sx={{ fontSize: '2rem', color: 'white' }}>Блюда</Typography>
      <List>
        {tags.map((tag) => (
          <Tag key={tag} selected={selectedTags.includes(tag) ? 1 : 0} onClick={() => handleToggle(tag)}>
            <ListItemText primary={tag} />
          </Tag>
        ))}
      </List>
      <Typography variant="h4" sx={{ fontSize: '2rem', marginTop: '1rem' }}>Мы</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
        <Button
          variant="contained"
          startIcon={<RecommendIcon />}
          sx={{ marginBottom: '1rem', width: '100%', backgroundColor: 'blue', color: 'white' }}
          href="https://vk.com/crystals_tmn"
          target="_blank"
        >
          Вконтакте
        </Button>
        <Button
          variant="contained"
          startIcon={<Instagram />}
          sx={{ marginBottom: '1rem', width: '100%', backgroundColor: 'purple', color: 'white' }}
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
