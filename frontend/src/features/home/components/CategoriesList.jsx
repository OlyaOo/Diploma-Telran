import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@redux/slices/categorySlice";
import CategoriesItems from "./CategoriesItems.jsx";
import "./CategoriesList.css";
import TitleList from "@common/components/ui/title/TitleList.jsx";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.categories || { items: [], status: 'idle', error: null });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="categories-section">
      <TitleList title="Categories" type="All categories" link="/categories" />
      <div className="category-wrapper">
        <div className="categories-list-container">
          {status === 'loading' && <p>Loading categories...</p>}
          {status === 'failed' && <p>Error: {error || 'Failed to load categories'}</p>}
          {items.length > 0 ? (
            items.slice(0, 4).map((category) => (
              <CategoriesItems
                key={category.id}
                id={category.id}
                image={category.image}
                title={category.title}
                isHomePage={true}
              />
            ))
          ) : (
            <p>No categories available</p>
          )}
        </div>
        <div className="all-categories-mobile">
          <a href="/categories" className="all-categories-btn">
            All categories
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;