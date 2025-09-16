import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart } from '@/redux/slices/cartSlice.js';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem.jsx'; // Теперь импортируем напрямую CartItem
import CheckoutForm from '../components/CheckoutForm.jsx';
import styles from './CartPage.module.css';
import TitleList from '@common/components/ui/title/TitleList.jsx';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cart);

  const totalPrice = items.reduce((sum, item) => sum + (item.discont_price || item.price) * (item.quantity || 1), 0);

  const handleQuantityChange = (id, delta) => {
    const item = items.find(i => i.id === id);
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

 

  if (items.length === 0) return <p className={styles.empty}>Shopping cart empty</p>;

  return (
    <div className={styles.cartPage}>
      <div className={styles.header}>
        <TitleList title="Shopping cart" type="Back to the store" link="/" />
      </div>
      
      <div className={styles.itemList}> 
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        ))}
      </div>
      <CheckoutForm items={items} totalPrice={totalPrice} />
    </div>
  );
};

export default CartPage;