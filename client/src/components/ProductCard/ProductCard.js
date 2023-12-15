

// client/src/components/ProductCard/ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onClick }) => {
    const { image, name, description, price } = product;

    return (
        <div className="product-card" onClick={onClick} >
            <img src={image} alt={name} className="product-image" />
            <div className="product-details">
                <h3 className="product-name">{name}</h3>
                <p className="product-description">{description.slice(0, 70)}</p>
                <p className="product-price">{`Цена: ${price} KGS.`}</p>
            </div>
        </div>
    );
};

export default ProductCard;
