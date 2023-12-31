

//
// import React, { useEffect } from 'react';
// import './ProductModal.css';

import React, { useEffect, useState } from 'react';
import './ProductModal.css';

const ProductModal = ({ isOpen, onClose, product }) => {
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        if (isOpen && product) {
            setMainImage(product.images[0]);
        }
    }, [isOpen, product]);

    const handleImageClick = (image) => {
        setMainImage(image);
    };

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
        <div className={`product-modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="product-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    &#10006;
                </button>
                <h2>{name}</h2>
                <div className="product-details">
                    <div className="product-image-main">
                        <img src={mainImage} alt={name} className="main-image" />
                    </div>
                    {/*<hr style={{width: "100%", height: "2px", background: "lightgray"}} />*/}

                    <div className="product-images-list">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="product-image-small"
                                onClick={() => handleImageClick(image)}
                            >
                                <img src={image} alt={`Image ${index + 1}`} className="small-image" />
                            </div>
                        ))}
                    </div>
                    <hr style={{width: "100%", height: "2px", background: "lightgray"}} />
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






