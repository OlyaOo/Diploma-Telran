import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import styles from './PriceRange.module.css';  

const PriceRange = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const debouncedChange = debounce((newPrices) => {
    onPriceChange(newPrices);
  }, 300);

  const handleMinChange = (value) => {
    setMinPrice(value);
    debouncedChange({ minPrice: value, maxPrice });
  };

  const handleMaxChange = (value) => {
    setMaxPrice(value);
    debouncedChange({ minPrice, maxPrice: value });
  };

  return (
    <div className={styles.priceRange}>
      <label>Price</label>
      <input 
        type="number"
        placeholder="from"
        value={minPrice}
        onChange={(e) => handleMinChange(e.target.value)} 
      />
      <input 
        type="number"
        placeholder='to'
        value={maxPrice}
        onChange={(e) => handleMaxChange(e.target.value)} 
      />
    </div>
  );
};

export default PriceRange;