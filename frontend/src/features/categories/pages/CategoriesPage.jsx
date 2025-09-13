import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@redux/slices/categorySlice.js';
import { Link } from 'react-router-dom';
import api from '@api/axios.js';
import styles from './CategoriesPage.module.css'
import Title from '../../../common/components/ui/title';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={styles.categoriesPage}>
      <Title text="Categories" />
      <div className={styles.categoriesGrid}>
        {items.map(cat => (
          <Link key={cat.id} to={`/category/${cat.id}`} className={styles.categoryCard}>
            <img 
              src={`${api.defaults.baseURL}/${cat.image}`}
              alt={cat.title} 
              className={styles.categoryImg} 
            />
            <p className={styles.categoryTitle}>{cat.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
