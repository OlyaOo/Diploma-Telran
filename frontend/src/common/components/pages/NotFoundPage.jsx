import React from 'react';
import { Link } from 'react-router-dom';
import cactusImage from '../../../assets/images/cactus.png'; 
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div className={styles.notFoundPage}>
    <div className={styles.numberContainer}>
      <span className={styles.number}>4</span>
      <img src={cactusImage} alt="Cactus" className={styles.cactus} />
      <span className={styles.number}>4</span>
    </div>
    <div className={styles.textContainer}>
      <div className={styles.textInnerContainer}>
    <h1 className={styles.title}>Page Not Found</h1>
    <p className={styles.message}>
      We're sorry, the page you requested could not be found. Please go back to
          the homepage.
    </p>
      </div>
    <Link to="/" className={styles.homeButton}>
    Go Home
    </Link>
  </div>
  </div>
);

export default NotFoundPage;
