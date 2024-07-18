import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import Profile from './pages/Profile';
import Header from './components/header/Header';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [highlightedProduct, setHighlightedProduct] = useState(null);

  const handleSearch = (productName) => {
    setHighlightedProduct(productName);
  };

  return (
    <>
      <Header 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
        setIsAdmin={setIsAdmin}
        handleSearch={handleSearch}
      />
      <Routes>
        <Route path="/" element={<Home isAdmin={isAdmin} highlightedProduct={highlightedProduct} setHighlightedProduct={setHighlightedProduct} />} />
        <Route path="/profile" element={<Profile setIsAuthenticated={setIsAuthenticated} />} />

      </Routes>
    </>
  );
};

export default App;
