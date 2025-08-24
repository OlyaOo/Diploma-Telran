import styles from './DiscountPrice.module.css';

const DiscountBadge = ({ price, discont_price }) => {
  const discount = Math.floor(((price - discont_price) / price) * 100);
  return <div className={styles['discount']}>-{discount}%</div>;
};

export default DiscountBadge;