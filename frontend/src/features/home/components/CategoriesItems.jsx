import React from "react";
import { Link } from "react-router-dom";
import "./CategoriesItems.css";
import { imgUrl, FALLBACK_IMG } from '@/utils/config';

const CategoriesItems = ({ image, title, id, isHomePage }) => {
  const fullImageUrl = imgUrl(image);

  return (
    <Link to={`/category/${id}`} className="category-item">
      <div className="image-wrapper">
        <img
          src={fullImageUrl}
          alt={title || "Category"}
          className="category-image"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMG;
            e.currentTarget.onerror = null;
          }}
        />
      </div>
      <p className="category-name-outside">{title || "No title"}</p>
    </Link>
  );
};

export default CategoriesItems;