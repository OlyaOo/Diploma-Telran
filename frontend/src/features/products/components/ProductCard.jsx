import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@common/utils';
import api from '@api/axios.js';

const ProductCard = ({ product }) => {
  const imageUrl = `${api.defaults.baseURL}/${product.image}`;
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={imageUrl} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      {product.discont_price ? (
        <p>
          <span>{formatPrice(product.discont_price)}</span>{' '}
          <span className="old-price">{formatPrice(product.price)}</span>
        </p>
      ) : (
        <p>{formatPrice(product.price)}</p>
      )}
    </div>
  );
};

export default ProductCard;
