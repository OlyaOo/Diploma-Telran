import HeartIcon from '@/assets/icons/heart.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';
import DiscountBadge from '@/features/discounts/components/DiscountPrice';
import styles from './ProductCardMain.module.css';

const ProductCard = ({ id, title, price, discont_price, image }) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';
  const imgSrc = image?.startsWith('/') ? `${baseUrl}${image}` : `${baseUrl}/${image}`;

  return (
    <div className={styles.productCard}>
      <DiscountBadge price={price} discont_price={discont_price} />

      <button className={styles.favoriteBtn}><HeartIcon className={styles.icon} /></button>
      <button className={styles.addToCart}><CartIcon className={styles.icon} /></button>

      <img src={imgSrc} alt={title} className={styles.productImg} />

      <p className={styles.productName}>{title}</p>

      <div className={styles.productPrice}>
        <span className={styles.newPrice}>${discont_price || price}</span>
        {discont_price && <span className={styles.oldPrice}>${price}</span>}
      </div>
    </div>
  );
};

export default ProductCard;
