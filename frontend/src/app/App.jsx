import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer, Breadcrumbs, NotFoundPage } from '@common/components';
import HomePage from '@features/home/pages/HomePage.jsx';
import ProductsPage from '@features/products/pages/ProductsPage.jsx';
import ProductDetailsPage from '@features/products/pages/ProductDetailsPage.jsx';
import CategoriesPage from '@features/categories/pages/CategoriesPage.jsx';
import SaleSection from '@common/components/layout/SaleSection';
import FavoritesPage from '@features/favorites/pages/FavoritesPage.jsx';
import CartPage from '@features/cart/pages/CartPage.jsx'; 
import DiscountsPage from '@features/discounts/pages/DiscountsPage.jsx';

const App = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/'; 

  return (
    <div className="app">
      <Header />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/category/:id" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/sales" element={<DiscountsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isHome && <SaleSection />}   
      <Footer />
    </div>
  );
};

export default App;