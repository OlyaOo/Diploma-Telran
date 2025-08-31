// DiscountBlock.jsx
import React, { useEffect, useState } from 'react';
import DiscountForm from './DiscountForm';
import backgroundImage from '@assets/imgs/discountForm/DiscountForm-bg.png';
import styles from './discount.module.scss';

const DiscountBlock = () => {
    const [hidden, setHidden] = useState(() => {
        try { return JSON.parse(localStorage.getItem('hasDiscount') || 'false'); }
        catch { return false; }
    });

    if (hidden) return null;

    return (
        <div className={styles.render}>
            <section className="discount">
                <h3 className="discount__title">5% off on the first order</h3>
                <div className="discount__container">
                    <div className="discount__image">
                        <img src={backgroundImage} alt="Discount promotion background" />
                    </div>
                    <DiscountForm onSuccess={() => setHidden(true)} />
                </div>
            </section>
        </div>
    );
};

export default DiscountBlock;
