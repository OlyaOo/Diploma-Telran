import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@redux/slices/categorySlice.js';
import CategoriesItems from "@features/home/components/CategoriesItems.jsx";
import SceletonGrid from '@common/components/ui/sceleton/SceletonGrid.jsx';
import TitleList from '@common/components/ui/title/TitleList.jsx';
import { Loader } from '@common/components';

import styles from './CategoriesPage.module.css'

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.categories || { items: [], status: 'idle', error: null });
  const isFirstLoad = status === 'loading' && items.length === 0;

  useEffect(() => {
    console.log('Dispatching fetchCategories...');
    dispatch(fetchCategories());
  }, [dispatch]);

  const getRandomCategories = (categories, count = 5) => {
    const shuffled = [...categories].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  console.log('Redux state:', { items, status, error });

  const fallbackCategories = [
    { id: 1, title: 'Annuals', image: '/category_img/1.jpg' },
    { id: 2, title: 'Nursery', image: '/category_img/2.jpg' },
    { id: 3, title: "Garden Art", image: "/category_img/3.jpeg" },
    { id: 4, title: "Plant Care", image: "/category_img/4.jpeg" },
    { id: 5, title: "Accessories", image: "/category_img/5.jpeg" },
  ];

  const categoriesToShow = isFirstLoad
    ? []
    : (items.length > 0 ? getRandomCategories(items, 5) : fallbackCategories);

  return (
    <div className={styles.categoriesPage}>
      <TitleList title="Categories" />
      <div className={styles.categoriesGrid}>
        {isFirstLoad
          ? <SceletonGrid count={12} />
          : (status === 'loading' && items.length > 0) ? <Loader /> : null}
        {status === 'failed' && <p>Error: {error || 'Failed to load categories'}</p>}
        {!isFirstLoad && (categoriesToShow.length > 0 ? (categoriesToShow.map((category) => (
          <CategoriesItems key={category.id}
            id={category.id}
            image={category.image}
            title={category.title}
            isHomePage={false}
          />
        ))) : (
          <p>No categories available</p>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
