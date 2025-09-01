import React from "react";
import "./CategoriesItems.css";

const CategoriesItems = ({ image, title, isHomePage }) => {
  return (
    
      <div className="category-item">
        <div className="image-wrapper">
          <img src={image} alt={title} className="category-image" />
        </div>
              <h3 className="category-name-outside">{title}</h3>

      </div>
  );
};

export default CategoriesItems;