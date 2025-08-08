import React from 'react';
import { useSelector } from 'react-redux';
import CheckoutForm from '../components/CheckoutForm.jsx';
import { formatPrice } from '@common/utils';

const CartPage = () => {
  const items = useSelector(state => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name} x {item.quantity}</li>
        ))}
      </ul>
      <p>Total: {formatPrice(total)}</p>
      <CheckoutForm />
    </div>
  );
};

export default CartPage;
