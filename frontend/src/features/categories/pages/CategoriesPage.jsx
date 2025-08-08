import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@redux/slices/categorySlice.js';
import { Link } from 'react-router-dom';
import api from '@api/axios.js';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <ul className="categories">
      {items.map(cat => (
        <li key={cat.id}>
          <Link to={`/category/${cat.id}`}>
            <img src={`${api.defaults.baseURL}/${cat.image}`} alt={cat.title} />
            <span>{cat.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoriesPage;
