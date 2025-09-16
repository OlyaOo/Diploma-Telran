import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '@features/products/components/ProductCard.jsx';
import { fetchProducts } from '@redux/slices/productSlice.js';
import TitleList from '@common/components/ui/title/TitleList.jsx';

import prodStyles from '@features/products/pages/ProductsPage.module.css';
import styles from './DiscountPage.module.css';

const DiscountsPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.products);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts({}));
    }
  }, [dispatch, status]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  let discountedItems = items.filter(p => p.discont_price);

  if (minPrice) discountedItems = discountedItems.filter(p => (p.discont_price || p.price) >= Number(minPrice));
  if (maxPrice) discountedItems = discountedItems.filter(p => (p.discont_price || p.price) <= Number(maxPrice));

  if (sort === 'price_asc') discountedItems.sort((a, b) => (a.discont_price || a.price) - (b.discont_price || b.price));
  if (sort === 'price_desc') discountedItems.sort((a, b) => (b.discont_price || b.price) - (a.discont_price || a.price));

  return (
    <div className={prodStyles.product}>
      <TitleList title="Discounted items" type="Back to the store" link="/" />
      <div className={styles.filter}>
        <div className={styles.price}>
          <label>Price</label>
          <input
            type="number"
            placeholder="from"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="to"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className={styles.sorted}>
          <label>Sorted</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">by default</option>
            <option value="price_asc">Price low to high</option>
            <option value="price_desc">Price high to low</option>
          </select>
        </div>
      </div>
      <div className={prodStyles.productGrid}>
        {discountedItems.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

export default DiscountsPage;
