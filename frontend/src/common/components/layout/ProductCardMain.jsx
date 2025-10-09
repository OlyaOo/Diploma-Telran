import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Добавлен для перехода на детали продукта
import { addToCart } from '@redux/slices/cartSlice.js';
import { addFavorite, selectIsFavorite } from '@redux/slices/favoritesSlice.js';
import { selectIsInCart } from '@redux/slices/cartSlice.js'; // Добавлен для проверки наличия в корзине
import HeartIcon from '@/assets/icons/heart.svg?react';
import HeartIconGreen from '@/assets/icons/heart_green.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';
import CartIconGreen from '@/assets/icons/cart_green.svg?react'; // Добавлен для зелёной иконки корзины
import DiscountBadge from '@/features/discounts/components/DiscountPrice';
import styles from './ProductCardMain.module.css';

import { imgUrl, backendFallbackUrl } from '@common/utils/imgUrl';

const ProductCardMain = ({ id, title, price, discont_price, image }) => {
  // const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';
  // const imgSrc = image
  //   ? (image.startsWith('http')
  //     ? image
  //     : `${baseUrl}${image.startsWith('/') ? image : `/${image}`}`)
  //   : `${baseUrl}/fallback.jpeg`;
const imgSrc = imgUrl(image);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Для навигации
  const isFavorite = useSelector(s => selectIsFavorite(s, id));
  const isInCart = useSelector(s => selectIsInCart(s, id)); // Проверка, есть ли в корзине

  const onToggleFavorite = () => dispatch(addFavorite(id));

  const onAddToCart = () => dispatch(addToCart({ id, title, price, discont_price, image, quantity: 1 }));

  const onClick = () => navigate(`/product/${id}`); // Функция для перехода на детали продукта

  return (
    <div className={styles.productCard}>
      <DiscountBadge price={price} discont_price={discont_price} />

      <button
        type="button"
        className={`${styles.favoriteBtn} ${isFavorite ? styles.isActive : ''}`}
        onClick={onToggleFavorite}
      >
        {isFavorite ? (
          <HeartIconGreen className={styles.icon} />
        ) : (
          <>
            <HeartIcon className={`${styles.icon} ${styles.base}`} />
            {/* зелёную используем как накладку и красим в чёрный через CSS */}
            <HeartIconGreen className={`${styles.icon} ${styles.hover}`} />
          </>
        )}
      </button>

      <button
        type="button"
        className={`${styles.addToCart} ${isInCart ? styles.isActive : ''}`}  // + добавили isActive
        onClick={onAddToCart}
      >
        {isInCart ? (
          <CartIconGreen className={styles.icon} />
        ) : (
          <>
            <CartIcon className={`${styles.icon} ${styles.base}`} />
            {/* накладка: используем зелёную заливку и перекрашиваем в чёрный через CSS */}
            <CartIconGreen className={`${styles.icon} ${styles.hover}`} />
          </>
        )}
      </button>
      {/* --- картинка с onError --- */}
      <img src={imgSrc} alt={title || 'Product'} className={styles.productImg} onClick={onClick}
        onError={(e) => {
          // e.currentTarget.src = `${baseUrl}/fallback.jpeg`;
          const fb = backendFallbackUrl();
          if (fb && e.currentTarget.src !== fb) e.currentTarget.src = fb;
        }}
      />
      <p className={styles.productName} onClick={onClick}>{title}</p>

      <div className={styles.productPrice}>
        <span className={styles.newPrice}>${discont_price || price}</span>
        {discont_price && <span className={styles.oldPrice}>${price}</span>}
      </div>
    </div>
  );
};

export default ProductCardMain;