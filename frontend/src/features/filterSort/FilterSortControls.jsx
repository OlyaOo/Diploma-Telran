import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import styles from './FilterSortControls.module.css';  // Новый CSS (комбинация твоих стилей)

const FilterSortControls = ({ onChange }) => {
    const [discounted, setDiscounted] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('default');

    const debouncedChange = debounce((newParams) => {
        onChange(newParams);
    }, 300);

    const handleDiscountedChange = (checked) => {
        setDiscounted(checked);
        onChange({ discounted: checked, minPrice, maxPrice, sort }); // Мгновенно, без debounce
    };

    const handleMinChange = (value) => {
        setMinPrice(value);
        debouncedChange({ discounted, minPrice: value, maxPrice, sort });
    };

    const handleMaxChange = (value) => {
        setMaxPrice(value);
        debouncedChange({ discounted, minPrice, maxPrice: value, sort });
    };

    const handleSortChange = (newSort) => {
        setSort(newSort);
        onChange({ discounted, minPrice, maxPrice, sort: newSort }); // Мгновенно
    };

    return (
        <div className={styles.controls}>
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
            <label className={styles.discountedLabel}>Discounted Items
                <input
                    type="checkbox"
                    checked={discounted}
                    onChange={(e) => handleDiscountedChange(e.target.checked)}
                />
            </label>



            <div className={styles.sortDropdown}>
                <label>Sorted</label>
                <select className={styles.sortSelect} value={sort} onChange={(e) => handleSortChange(e.target.value)}>
                    <option value="default">by default</option>
                    <option value="price_asc">Price low to high</option>
                    <option value="price_desc">Price high to low</option>
                    <option value="name_asc">A-Z</option>
                    <option value="name_desc">Z-A</option>
                </select>
            </div>
        </div>
    );
};

export default FilterSortControls;