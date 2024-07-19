import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import api from "../api/api";
import CategoryButton from "../styledComponents/buttons/categorySelectionButton";
import { getRandomElements } from "../hooks/useProducts";
import ProductCard from "../components/productCards/ProductCard";
import AddProductModal from "../components/modalForms/admin/AddProductModal";
import EditProductModal from "../components/modalForms/admin/EditProductModal";
import AddCategoryModal from "../components/modalForms/admin/AddCategoryModal";
import EditCategoryModal from "../components/modalForms/admin/EditCategoryModal";
import TagSidebar from "../components/tagsSidebar/TagSidebar";
import ScrollToTopButton from "../components/buttons/ScrollToTopButton";
import ConfirmDialog from "../components/ConfirmDialog";
import StyledButton from "../styledComponents/buttons/addSomethingButton";

const Home = ({ isAdmin, highlightedProduct, setHighlightedProduct }) => {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsResponse = await api.get("products/");
        const categoriesResponse = await api.get("categories/");

        const products = productsResponse.data;
        const categories = categoriesResponse.data;

        setProducts(products);
        setCategories(categories);
        setRecommendedProducts(getRandomElements(products, 3));

        const groupedProducts = categories.reduce((acc, category) => {
          acc[category.name] = products.filter(
            (product) => product.category_id === category.id
          );
          return acc;
        }, {});

        setProductsByCategory(groupedProducts);
      } catch (error) {
        console.error("Ошибка при получении продуктов:", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  useEffect(() => {
    if (highlightedProduct) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(highlightedProduct.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [highlightedProduct, products]);

  const handleOpenProductModal = () => {
    setProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setProductModalOpen(false);
  };

  const handleOpenEditProductModal = (product) => {
    setEditProduct(product);
    setEditProductModalOpen(true);
  };

  const handleCloseEditProductModal = () => {
    setEditProductModalOpen(false);
    setEditProduct(null);
  };

  const handleOpenCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleOpenEditCategoryModal = (category) => {
    setEditCategory(category);
    setEditCategoryModalOpen(true);
  };

  const handleCloseEditCategoryModal = () => {
    setEditCategoryModalOpen(false);
    setEditCategory(null);
  };

  const handleTagToggle = async (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);
    await handleApplyFilters(updatedTags);
  };

  const handleApplyFilters = async (tags) => {
    try {
      const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
      const response = await api.post("products/filter", {
        tags: lowerCaseTags.join(","),
      });
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Ошибка при фильтрации продуктов:", error);
    }
  };

  const scrollToCategory = (categoryName) => {
    const element = document.getElementById(categoryName);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offsetTop =
        window.scrollY +
        elementRect.top -
        (window.innerHeight / 2 - elementRect.height / 2);
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleDeleteProduct = (productId) => {
    setDeleteItem(productId);
    setDeleteType("product");
    setConfirmDialogOpen(true);
  };

  const handleDeleteCategory = (categoryId) => {
    setDeleteItem(categoryId);
    setDeleteType("category");
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteType === "product") {
        await api.delete(`products/${deleteItem}`);
        setProducts(products.filter((product) => product.id !== deleteItem));
      } else if (deleteType === "category") {
        await api.delete(`categories/${deleteItem}`);
        setCategories(
          categories.filter((category) => category.id !== deleteItem)
        );
      }
      setConfirmDialogOpen(false);
      setDeleteItem(null);
    } catch (error) {
      console.error(`Ошибка при удалении ${deleteType}:`, error);
    }
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setDeleteItem(null);
  };

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingLeft: "70px",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <TagSidebar
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          {selectedTags.length === 0 && (
            <>
              <Grid container spacing={2}>
                {categories.map((category) => (
                  <Grid item key={category.id} sx={{ mt: 1, mr: 1 }}>
                    <CategoryButton
                      onClick={() => scrollToCategory(category.name)}
                      isAdmin={isAdmin}
                      onEdit={() => handleOpenEditCategoryModal(category)}
                      onDelete={() => handleDeleteCategory(category.id)}
                    >
                      {category.name}
                    </CategoryButton>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="h4" component="h1" gutterBottom>
                Вам понравится
              </Typography>
              {isAdmin && (
                <>
                  <Grid item xs={12} sm={6} md={4}>
                    <StyledButton onClick={handleOpenProductModal}>
                      Добавить продукт
                    </StyledButton>
                    <AddProductModal
                      open={productModalOpen}
                      onClose={handleCloseProductModal}
                    />
                    <StyledButton onClick={handleOpenCategoryModal}>
                      Добавить категорию
                    </StyledButton>
                  </Grid>

                  <AddCategoryModal
                    open={categoryModalOpen}
                    onClose={handleCloseCategoryModal}
                  />
                  <EditProductModal
                    open={editProductModalOpen}
                    onClose={handleCloseEditProductModal}
                    product={editProduct}
                  />
                  <EditCategoryModal
                    open={editCategoryModalOpen}
                    onClose={handleCloseEditCategoryModal}
                    category={editCategory}
                  />
                </>
              )}
              <Grid container spacing={3}>
                {recommendedProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard
                      product={product}
                      isAdmin={isAdmin}
                      onEdit={handleOpenEditProductModal}
                      onDelete={handleDeleteProduct}
                      highlightedProduct={highlightedProduct}
                    />
                  </Grid>
                ))}
              </Grid>
              {Object.keys(productsByCategory).map((categoryName) => (
                <div
                  key={categoryName}
                  id={categoryName}
                  style={{ marginTop: "20px" }}
                >
                  <Typography variant="h5" component="h2" gutterBottom>
                    {categoryName}
                  </Typography>
                  <Grid container spacing={3}>
                    {productsByCategory[categoryName].map((product) => (
                      <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductCard
                          product={product}
                          isAdmin={isAdmin}
                          onEdit={handleOpenEditProductModal}
                          onDelete={handleDeleteProduct}
                          highlightedProduct={highlightedProduct}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ))}
            </>
          )}
          {selectedTags.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Продукты ({selectedTags.join(", ")})
              </Typography>
              <Grid container spacing={3}>
                {filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard
                      product={product}
                      isAdmin={isAdmin}
                      onEdit={handleOpenEditProductModal}
                      onDelete={handleDeleteProduct}
                      highlightedProduct={highlightedProduct}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </Grid>
      </Grid>
      <ScrollToTopButton />
      <ConfirmDialog
        open={confirmDialogOpen}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleConfirmDelete}
        title="Подтверждение удаления"
        description={`Вы уверены, что хотите удалить ${
          deleteType === "product" ? "продукт" : "категорию"
        }?`}
      />
    </Container>
  );
};

export default Home;
