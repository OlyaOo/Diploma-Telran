import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@redux/slices/cartSlice.js'; 
import HeartIcon from '@/assets/icons/heart.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';
import DiscountBadge from '@/features/discounts/components/DiscountPrice';
import styles from './ProductCardMain.module.css';


const ProductCard = ({ id, title, price, discont_price, image, onClick }) => {
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';
  const imgSrc = image?.startsWith('/') ? `${baseUrl}${image}` : `${baseUrl}/${image}`;

  const handleAddToCart = (e) => {
    
    dispatch(addToCart({ id, title, price, discont_price, image, quantity: 1 })); // Добавляем товар в корзину
  };

 

  return (
    <div className={styles.productCard}>
      <DiscountBadge price={price} discont_price={discont_price} />

      <button className={styles.favoriteBtn}><HeartIcon className={styles.icon} />
      </button>
      <button className={styles.addToCart} onClick={handleAddToCart}>
        <CartIcon className={styles.icon} />
      </button>

      <img src={imgSrc} alt={title} className={styles.productImg} onClick={onClick} />

      <p className={styles.productName} onClick={onClick}>{title}</p> 

      <div className={styles.productPrice}>
        <span className={styles.newPrice}>${discont_price || price}</span>
        {discont_price && <span className={styles.oldPrice}>${price}</span>}
      </div>
    </div>
  );
};

export default ProductCard;