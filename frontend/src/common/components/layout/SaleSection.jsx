import React from 'react';
import bridgeImg from '@/assets/imgs/bridge.png'; // Исправленный путь с алиасом '@' = './src'
import basketImg from '@/assets/imgs/basket.png';
import lockImg from '@/assets/imgs/lock.png';
import secateursImg from '@/assets/imgs/secateurs.png';
import HeartIcon from '@/assets/icons/heart.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';


const SaleSection = () => {
    const products = [
        {
            id: 1,
            name: 'Decorative forged bridge',
            image: bridgeImg,
            discount: 50,
            price: 500,
            oldPrice: 1000,
        },
        {
            id: 2,
            name: 'Flower basket',
            image: basketImg,
            discount: 34,
            price: 100,
            oldPrice: 150,
        },
        {
            id: 3,
            name: 'Aquarium lock',
            image: lockImg,
            discount: 25,
            price: 150,
            oldPrice: 250,
        },
        {
            id: 4,
            name: 'Secateurs',
            image: secateursImg,
            discount: 17,
            price: 199,
            oldPrice: 240,
        },

    ]

    const displayedProducts = products.slice(0, 4);

    return (
        <section className="sale-section">
            <div className="sale-header">
                <h2 className='sale-title'> Sale</h2>
                <button className='all-sales-btn'>All sales</button>
            </div>
        <div className='sale-grid'>
            {displayedProducts.map((products) => (
                <div key={products.id} className="product-card">
                    <div className='product-discount'>-{products.discount}%</div>
                    <button className='favorite-btn'>< HeartIcon className='icon'/></button>
                    <button className='add-to-cart'><CartIcon className='icon'/></button>
                    <img src={products.image} alt={products.name} className='product-img' />
                    <p className='product-name'>{products.name}</p>
                    <div className='product-price'>
                        <span className='new-price'>${products.price}</span>
                        <span className='old-price'>${products.oldPrice}</span>
                    </div>
                </div>
            ))}
        </div>  
        </section>
    )
}

export default SaleSection