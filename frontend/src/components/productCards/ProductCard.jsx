import React, { useState } from "react";
import { Card, CardMedia, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductDetailCard from "./ProductDetailCard";

const ProductCard = ({
  product,
  isAdmin,
  onEdit,
  onDelete,
  highlightedProduct,
}) => {
  const [detailOpen, setDetailOpen] = useState(false);

  const handleOpenDetail = () => {
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  const isHighlighted =
    highlightedProduct &&
    product.name.toLowerCase().includes(highlightedProduct?.toLowerCase());

  return (
    <>
      <Card
        onClick={handleOpenDetail}
        sx={{
          position: "relative",
          borderRadius: "50%",
          overflow: "visible",
          width: 250,
          height: 250,
          transform: isHighlighted ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.3s ease-in-out",
          filter: highlightedProduct && !isHighlighted ? "blur(2px)" : "none",
        }}
        data-name={product.name.toLowerCase()}
      >
        {isAdmin && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              display: "flex",
              zIndex: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <CardMedia
          component="img"
          sx={{
            borderRadius: "50%",
            width: 250,
            height: 250,
            margin: "auto",
            marginTop: 2,
          }}
          image={product.image_url}
          alt={product.name}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -7,
            left: -10,
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            padding: "5px 10px",
          }}
        >
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontSize: "1.25rem" }}
          >
            {product.name}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: -5,
            zIndex: 1,
            width: 70,
            height: 70,
            backgroundColor: "rgba(85, 107, 47, 0.9)",
            borderRadius: "50%",
            padding: "22px 4px",
          }}
        >
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontSize: "1.25rem", color: "white" }}
          >
            {product.price}₽
          </Typography>
        </Box>
      </Card>
      <ProductDetailCard
        product={product}
        open={detailOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default ProductCard;
