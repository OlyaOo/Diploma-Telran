import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '@features/products/components/ProductCard.jsx';

const DiscountsPage = () => {
  const items = useSelector(state => state.products.items.filter(p => p.discont_price));
  return (
    <div>
      <h2>All sales</h2>
      {items.map(prod => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
};

export default DiscountsPage;
