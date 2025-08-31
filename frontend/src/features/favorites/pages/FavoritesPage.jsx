import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '@features/products/components/ProductCard.jsx';
import { selectFavoriteIds } from '@redux/slices/favoritesSlice.js';

export default function FavoritesPage() {
  const favoriteIds = useSelector(selectFavoriteIds); 
const { items: products = [], status = 'idle' } = useSelector(s => s.products);

  if (favoriteIds.length === 0) {
    return (
      <div>
        <h2>Favorites</h2>
        <p>The list is empty.</p>
      </div>
    );
  }

  if (products.length === 0 && status === 'loading') {
    return (
      <div>
        <h2>Favorites</h2>
        <p>Loading…</p>
      </div>
    );
  }

  const favSet = new Set(favoriteIds.map(String));
  const favoriteProducts = products.filter(p => favSet.has(String(p.id)));

  return (
    <div>
      <h2>Favorites ({favoriteProducts.length})</h2>
      <div className="products-grid">
        {/* класс-нейм взять из ProductCard.module.css */}
        {favoriteProducts.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
