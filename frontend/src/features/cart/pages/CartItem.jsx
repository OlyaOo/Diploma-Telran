import React from 'react';
import styles from './CartItem.module.css';
import { X } from "lucide-react";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';
  const imgSrc = item.image
    ? (item.image.startsWith('http')
        ? item.image
        : `${baseUrl}${item.image.startsWith('/') ? item.image : `/${item.image}`}`)
    : `${baseUrl}/fallback.jpeg`;

  const currentPrice = item.discont_price || item.price;
  const itemTotal = currentPrice * item.quantity;

  return (
    <div className={styles.item}>
      <img src={imgSrc} alt={item.title} className={styles.itemImg} 
      onError={(e) => {
        e.currentTarget.src = `${baseUrl}/fallback.jpeg`;
      }}
      />
      <div className={styles.itemInfo}>
        <div className={styles.header}>
          <h2 className={styles.title}>{item.title}</h2>
          <button className={styles.removeBtn} onClick={()=>onRemove(item.id)} aria-label="Remove"><X size={20}/></button>
        </div>
        <div className={styles.controls}>
          <div className={styles.quantity}>
            <button onClick={() => onQuantityChange(item.id, -1)} className={styles.quantityButton}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => onQuantityChange(item.id, 1)} className={styles.quantityButton}>+</button>
          </div>
          <div className={styles.price}>
            <span className={styles.newPrice}>${itemTotal.toFixed(2)}</span>
            {item.discont_price && (
              <span className={styles.oldPrice}>${(item.price * item.quantity).toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;