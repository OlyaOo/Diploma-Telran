import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@redux/slices/productSlice.js';
import { useNavigate } from 'react-router-dom';
import styles from './SaleSection.module.css';
import ProductCardMain from '@/common/components/layout/ProductCardMain';
import TitleList from '@common/components/ui/title/TitleList.jsx';

// 1) helper function: random sampling of N elements without repetitions
function sampleRandom(arr, n = 4) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
}

const SaleSection = () => {
  const dispatch = useDispatch();
  const { items = [] } = useSelector(state => state.products);
  const navigate = useNavigate();

  // 2) store selected IDs between renders (without causing a re-render)
  const chosenIdsRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 3) filter discounted products
  const discountItems = items.filter(
    p => Number.isFinite(p?.price) &&
      Number.isFinite(p?.discont_price) &&
      p.discont_price < p.price
  );

  // 4) We set 4 random IDs once when the data is ready
  useEffect(() => {
    // if the list is empty — reset the selection
    if (discountItems.length === 0) {
      chosenIdsRef.current = null;
      return;
    }
    // if we haven't selected yet — choose 4 random ones
    if (!chosenIdsRef.current) {
      chosenIdsRef.current = sampleRandom(discountItems, 4).map(p => p.id);
    }
  }, [discountItems]);

  // 5) get the chosen products to display
  const chosenIds = chosenIdsRef.current || [];
  const displayed = discountItems.filter(p => chosenIds.includes(p.id));

  const handleCardClick = (id) => {
    navigate(`/product/${id}`)
  }

  return (
    <section className={styles.saleSection}>
      <TitleList title="Sale" type="All sales" link="/sales" />

      <div className={styles.saleGrid}>
        {displayed.map(prod => (
          <ProductCardMain
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
