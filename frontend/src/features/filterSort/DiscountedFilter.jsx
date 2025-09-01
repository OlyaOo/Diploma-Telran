import React, { useState } from 'react';
import styles from './DiscountedFilter.module.css';  // Создайте этот CSS файл

const DiscountedFilter = ({ onDiscountedChange }) => {
  const [discounted, setDiscounted] = useState(false);

  const handleDiscountedChange = (checked) => {
    setDiscounted(checked);
    onDiscountedChange(checked);
  };

  return (
    <label className={styles.discountedLabel}>Discounted Items 
      <input 
        type="checkbox"
        checked={discounted}
        onChange={(e) => handleDiscountedChange(e.target.checked)} 
      />
    </label>
  );
};

export default DiscountedFilter;