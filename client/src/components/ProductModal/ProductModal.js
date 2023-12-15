


import React, { useEffect } from 'react';
import './ProductModal.css';

const ProductModal = ({ isOpen, onClose, product }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    if (!isOpen || !product) {
        return null;
    }

    const { name, images, description, specifications } = product;

    return (
        <div className="product-modal-overlay" onClick={onClose}>
            <div className="product-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    &#10006;
                </button>
                <h2>{name}</h2>
                <div className="product-details">
                    <div className="product-image-main">
                        <img src={images[0]} alt={name} />
                    </div>
                    <div className="product-images-list">
                        {images.slice(1).map((image, index) => (
                            <div key={index} className="product-image-small">
                                <img src={image} alt={`Image ${index + 2}`} />
                            </div>
                        ))}
                    </div>
                    <div className="product-description">{description}</div>
                </div>
                <div className="product-characteristics">
                    <h3>Характеристики</h3>
                    <table>
                        <tbody>
                        {specifications &&
                        Object.entries(specifications).map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;





