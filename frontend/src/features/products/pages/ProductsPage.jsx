import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '@redux/slices/productSlice.js';
import ProductCard from '../components/ProductCard.jsx';
import { Loader } from '@common/components';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { items, status } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts(id));
  }, [dispatch, id]);

  if (status === 'loading') return <Loader />;

  return (
    <div className="products">
      {items.map(prod => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
};

export default ProductsPage;
