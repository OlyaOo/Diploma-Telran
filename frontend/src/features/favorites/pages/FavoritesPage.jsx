import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '@features/products/components/ProductCard.jsx';

const FavoritesPage = () => {
  const items = useSelector(state => state.favorites.items);
  return (
    <div>
      <h2>Favorites</h2>
      {items.map(prod => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
};

export default FavoritesPage;
