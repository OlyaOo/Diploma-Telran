import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@redux/slices/productSlice.js';
import ProductCard from './ProductCard';

const SaleSection = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const discountItems = items.filter(p => p.discont_price && p.discont_price < p.price);
  const displayed = discountItems.slice(0, 4);

  return (
    <section className="sale-section">
      <div className="sale-header">
        <h2 className="sale-title">Sale</h2>
        <div className="sale-line" />   
        <button className="all-sales-btn">All sales</button>
      </div>

      <div className="sale-grid">
        {displayed.map(prod => (
          <ProductCard
            key={prod.id}
            id={prod.id}
            title={prod.title}
            price={prod.price}
            discont_price={prod.discont_price}
            image={prod.image}
          />
        ))}
      </div>
    </section>
  );
};

export default SaleSection;
