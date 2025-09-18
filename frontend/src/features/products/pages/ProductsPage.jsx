import React, { useEffect, useState } from 'react'; // Исправленный импорт с useState
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '@redux/slices/productSlice.js';
import ProductCard from '../components/ProductCard.jsx';
import { Loader } from '@common/components';
import SceletonGrid from '@common/components/ui/sceleton/SceletonGrid.jsx';
import styles from './ProductsPage.module.css';
import FilterSortControls from '../../filterSort/FilterSortControls.jsx'; // Новый компонент
import TitleList from '@common/components/ui/title/TitleList.jsx';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { items, status } = useSelector(state => state.products);
  const { items: categories } = useSelector(state => state.categories);
  const isFirstLoad = status === 'loading' && items.length === 0;
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', discounted: false });
  const [sort, setSort] = useState('default');

  useEffect(() => {
    dispatch(fetchProducts({ categoryId: id, ...filters, sort }));
  }, [dispatch, id, filters, sort]);

  let filteredSortedItems = [...items];

  if (id) filteredSortedItems = filteredSortedItems.filter(p => p.categoryId === Number(id));

  if (filters.minPrice) filteredSortedItems = filteredSortedItems.filter(p => p.price >= Number(filters.minPrice));
  if (filters.maxPrice) filteredSortedItems = filteredSortedItems.filter(p => p.price <= Number(filters.maxPrice));
  if (filters.discounted) filteredSortedItems = filteredSortedItems.filter(p => p.discont_price);

  if (sort === 'price_asc') filteredSortedItems.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') filteredSortedItems.sort((a, b) => b.price - a.price);
  if (sort === 'name_asc') filteredSortedItems.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === 'name_desc') filteredSortedItems.sort((a, b) => b.title.localeCompare(a.title));

  const handlePriceChange = (prices) => {
    setFilters(prev => ({ ...prev, ...prices }));
  };

  const handleDiscountedChange = (checked) => {
    setFilters(prev => ({ ...prev, discounted: checked }));
  };

  let pageTitle = 'Products';
  if (id) {
    const cat = categories.find(c => c.id === Number(id));
    pageTitle = cat ? cat.title : 'Products';
  }

  return (
    <div className={styles.product}>
      <TitleList title={pageTitle} />
      <div className={styles.filterSection}>
        <FilterSortControls onChange={handlePriceChange} onDiscountedChange={handleDiscountedChange} onSortChange={setSort} /> {/* Обновлённый вызов с отдельными handlers, если нужно; или один onChange */}
      </div>
      <div className={styles.productGrid}>
        {isFirstLoad ? (
          <SceletonGrid count={12} />
        ) : status === 'loading' ? (
          <Loader />
        ) : (
          filteredSortedItems.slice(0, 35).map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsPage;