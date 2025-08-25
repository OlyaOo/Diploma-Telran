import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@redux/slices/productSlice.js';
import ProductCard from './ProductCardMain';
import styles from './SaleSection.module.css';
import Title from '../ui/title';

const SaleSection = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const discountItems = items.filter(p => p.discont_price && p.discont_price < p.price);
  const displayed = discountItems.slice(6, 10);

  return (
    <section className={styles['sale-section']}>
      <div className={styles['sale-header']}>
        <Title text="Sale" />
        <div className={styles['sale-line']} />   
        <button className={styles['all-sales-btn']}>All sales</button>
      </div>

      <div className={styles['sale-grid']}>
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
