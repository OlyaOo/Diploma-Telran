import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Добавлен для перехода на детали продукта
import { addToCart } from '@redux/slices/cartSlice.js';
import { addFavorite, selectIsFavorite } from '@redux/slices/favoritesSlice.js';
import HeartIcon from '@/assets/icons/heart.svg?react';
import HeartIconGreen from '@/assets/icons/heart_green.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';
import DiscountBadge from '@/features/discounts/components/DiscountPrice';
import styles from './ProductCardMain.module.css';

const ProductCardMain = ({ id, title, price, discont_price, image }) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';
  const imgSrc = image?.startsWith('/') ? `${baseUrl}${image}` : `${baseUrl}/${image}`;

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Для навигации
  const isFavorite = useSelector(s => selectIsFavorite(s, id));

  const onToggleFavorite = () => dispatch(addFavorite(id));

  const onAddToCart = () => dispatch(addToCart({ id, title, price, discont_price, image, quantity: 1 }));

  const onClick = () => navigate(`/product/${id}`); // Функция для перехода на детали продукта

  return (
    <div className={styles.productCard}>
      <DiscountBadge price={price} discont_price={discont_price} />

      <button className={styles.favoriteBtn} onClick={onToggleFavorite}>
        {isFavorite ? <HeartIconGreen className={styles.icon} /> : <HeartIcon className={styles.icon} />}
      </button>

      <button className={styles.addToCart} onClick={onAddToCart}><CartIcon className={styles.icon} /></button>

      <img src={imgSrc} alt={title} className={styles.productImg} onClick={onClick} />

      <p className={styles.productName} onClick={onClick}>{title}</p> 

      <div className={styles.productPrice}>
        <span className={styles.newPrice}>${discont_price || price}</span>
        {discont_price && <span className={styles.oldPrice}>${price}</span>}
      </div>
    </div>
  );
};

export default ProductCardMain;