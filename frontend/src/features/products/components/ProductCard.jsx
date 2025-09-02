import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@common/utils';
import api from '@api/axios.js';
import styles from './ProductCard.module.css';
import HeartIcon from '@/assets/icons/heart.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';
import DiscountBadge from '../../discounts/components/DiscountPrice'


const ProductCard = ({ product }) => {
  const imageUrl = `${api.defaults.baseURL}/${product.image}`;

  return (
    
    <div className={styles.productCard}>
      
      <Link to={`/product/${product.id}`} className={styles.productLink}>
        <img src={imageUrl} alt={product.title} className={styles.productImg} />
        <h3 className={styles.productName}>{product.title}</h3>
        <button className={styles['favorite-btn']}><HeartIcon className={styles.icon} /></button>
      <button className={styles['add-to-cart']}><CartIcon className={styles.icon} /></button>
      </Link>
          
      <div className={styles.priceBlock}>
        {product.discont_price ? (
          <>
            <DiscountBadge price={product.price} discont_price={product.discont_price}/>
            <span className={styles.newPrice}>{formatPrice(product.discont_price)}</span>
            <span className={styles.oldPrice}>{formatPrice(product.price)}</span>
          </>
        ) : (
          <span className={styles.newPrice}>{formatPrice(product.price)}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
