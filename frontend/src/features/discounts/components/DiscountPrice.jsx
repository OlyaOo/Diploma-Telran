import styles from './DiscountPrice.module.css';

const DiscountBadge = ({ price, discont_price, className = '' }) => {
  const discount = Math.floor(((price - discont_price) / price) * 100);
  const finalClass = className || styles.discount;  // Если className передан, используем его; иначе — оригинальный
  return <div className={finalClass}>-{discount}%</div>;
};

export default DiscountBadge;