import React, { useState, useEffect,useCallback } from "react";
import debounce from "lodash.debounce";
import { AppBar, Toolbar, InputAdornment, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import HeaderButton from "../../styledComponents/buttons/headerButton";
import SloganText from "../../styledComponents/typography/sloganText";
import MainName from "../../styledComponents/typography/mainName";
import SearchField from "../../styledComponents/textFields/searchField";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AuthModal from "../modalForms/AuthModal";
import Cart from "../cart/Cart";

const Header = ({
  isAuthenticated,
  setIsAuthenticated,
  setIsAdmin,
  handleSearch,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const roles = JSON.parse(atob(token.split(".")[1])).roles;
      setIsAdmin(roles.includes("admin"));
    }
  }, [setIsAuthenticated, setIsAdmin]);

  const handleOpenAuth = () => {
    setModalOpen(true);
  };

  const handleCloseAuth = () => {
    setModalOpen(false);
  };

  const handleOpenCart = () => {
    setCartOpen(true);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };
  const scrollToProduct = (query) => {
    handleSearch(query);
    const productElements = document.querySelectorAll(
      `[data-name*="${query}"]`
    );
    if (productElements.length > 0) {
      const element = productElements[0];
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
  const debouncedScrollToProduct = useCallback(
    debounce((query) => scrollToProduct(query), 500),
    []
  );

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (event.target.value === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    debouncedScrollToProduct(query);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery.trim());
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#D8C1B4",
          boxShadow: "none",
          top: 0,
          zIndex: 1100,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MainName variant="h5" component="div">
            CRYSTALS
          </MainName>
          <SloganText component="div">
            Напитки и сладости, <br />
            которые не портят фигуру
          </SloganText>
          <SearchField
            id="outlined-basic"
            type="search"
            variant="outlined"
            placeholder="Поиск"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchSubmit}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div>
            <HeaderButton component={Link} to="/">
              Главная
            </HeaderButton>
            {isAuthenticated ? (
              <HeaderButton component={Link} to="/profile">
                Личный кабинет
              </HeaderButton>
            ) : (
              <HeaderButton onClick={handleOpenAuth}>Войти</HeaderButton>
            )}
            <IconButton onClick={handleOpenCart} sx={{ color: "#000000" }}>
              <ShoppingCartIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AuthModal
        open={modalOpen}
        onClose={handleCloseAuth}
        setIsAuthenticated={setIsAuthenticated}
        setIsAdmin={setIsAdmin}
      />
      <Cart
        open={cartOpen}
        onClose={handleCloseCart}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
};

export default Header;
