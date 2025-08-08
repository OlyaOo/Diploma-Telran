import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '@redux/slices/productSlice.js';
import { Loader } from '@common/components';
import { formatPrice } from '@common/utils';
import api from '@api/axios.js';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, status } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (status === 'loading' || !current) return <Loader />;

  const imageUrl = `${api.defaults.baseURL}/${current.image}`;

  return (
    <div className="product-details">
      <img src={imageUrl} alt={current.title} />
      <h2>{current.title}</h2>
      {current.discont_price ? (
        <p>
          <span>{formatPrice(current.discont_price)}</span>{' '}
          <span className="old-price">{formatPrice(current.price)}</span>
        </p>
      ) : (
        <p>{formatPrice(current.price)}</p>
      )}
      <p>{current.description}</p>
    </div>
  );
};

export default ProductDetailsPage;
