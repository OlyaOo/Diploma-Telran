import React from 'react';
import ProductOfDayModal from '../components/ProductOfDayModal.jsx';
import DiscountBlock from '../components/DiscountForm/DiscountBlock.jsx';

const HomePage = () => (
  <section className="home">
    <div className="home__container">
      <DiscountBlock />
    </div>
  </section>
);

export default HomePage;
