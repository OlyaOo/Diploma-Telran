import React from 'react';
import ProductOfDayModal from '../components/ProductOfDayModal.jsx';
import CategoriesList from '../components/CategoriesList';
import DiscountBlock from '../components/DiscountForm/DiscountBlock.jsx';
import ProductCard from '../../products/components/ProductCard';
import "@styles/categories.css"

const HomePage = () => (
  <section className="home">
    <div className="home__container">
      <h1>Welcome to Garten Products</h1>
      <ProductOfDayModal />
      <DiscountBlock />
      <CategoriesList />
      <h2>Random Discounted Products</h2>
      <div className='discounted-products'>
        <ProductCard product={{
          id: 1,
          title: 'Sample Product',
          image: 'images/product1.jpg',
          price: 240,
          discont_price: 199,
          image: "/product_img/sample.jpg" 
        }} />
    </div>
    </div>
  </section>
);

export default HomePage;
