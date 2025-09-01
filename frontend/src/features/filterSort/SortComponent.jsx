import React, { useState } from 'react';
import styles from './SortComponent.module.css';


const SortComponent = ({ onSortChange }) => {
  const [sort, setSort] = useState('default');

  const handleChange = (e) => {
    const newSort = e.target.value;
    setSort(newSort);
    onSortChange(newSort); 
  };

  return (
    <div className={styles.sortDropdown}>
        
    <label>Sorted</label>
    <select className={styles.sortSelect} value={sort} onChange={handleChange}>
      <option value="default">by default</option>
      <option value="price_asc">Price low to high</option>
      <option value="price_desc">Price high to low</option>
      <option value="name_asc">A-Z</option>
      <option value="name_desc">Z-A</option>
    </select>
    </div>
  );
}

export default SortComponent;

