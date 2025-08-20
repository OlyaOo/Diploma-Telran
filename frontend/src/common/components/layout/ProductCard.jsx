import HeartIcon from '@/assets/icons/heart.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';
import DiscountBadge from './DiscountPrice'; // 

const ProductCard = ({ id, title, price, discont_price, image }) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';
  const imgSrc = image?.startsWith('/') ? `${baseUrl}${image}` : `${baseUrl}/${image}`;

  return (
    <div className="product-card">
      <DiscountBadge price={price} discont_price={discont_price} />

      <button className="favorite-btn"><HeartIcon className="icon" /></button>
      <button className="add-to-cart"><CartIcon className="icon" /></button>

      <img src={imgSrc} alt={title} className="product-img" />

      <p className="product-name">{title}</p>

      <div className="product-price">
        <span className="new-price">${discont_price || price}</span>
        {discont_price && <span className="old-price">${price}</span>}
      </div>
    </div>
  );
};

export default ProductCard;
