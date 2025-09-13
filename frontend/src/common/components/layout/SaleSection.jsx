import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@redux/slices/productSlice.js';

import styles from './SaleSection.module.css';
import Title from '@/common/components/ui/title.jsx';
import ProductCard from '@/common/components/layout/ProductCardMain';
import { useNavigate } from 'react-router-dom';

const SaleSection = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const discountItems = items.filter(p => p.discont_price && p.discont_price < p.price);
  const displayed = discountItems.slice(4, 8);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`)
  }

  return (
    <section className={styles.saleSection}>
      <div className={styles.saleHeader}>
        <Title text="Sale" />
        <div className={styles.saleLine} />   
        <button className={styles.allSalesBtn}>All sales</button>
      </div>

      <div className={styles.saleGrid}>
        {displayed.map(prod => (
          <ProductCard
            key={prod.id}
            id={prod.id}
            title={prod.title}
            price={prod.price}
            discont_price={prod.discont_price}
            image={prod.image}
            onClick={() => handleCardClick(prod.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default SaleSection;
