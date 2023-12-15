
import React, { useState, useEffect } from 'react';
import ProductCard from './../ProductCard/ProductCard';
import Sidebar from './../Sidebar/Sidebar';
import ProductModal from './../ProductModal/ProductModal';
import './ProductList.css';

const ProductList = ({ searchKeyword }) => {
    const [products, setProducts] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = 'http://localhost:5500/products';

                if (selectedType) {
                    url += `?type=${selectedType}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [selectedType]);

    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleModalClose = () => {
        setSelectedProduct(null);
    };

    const filteredProducts = products
        .filter((product) => !selectedType || product.type === selectedType)
        .filter((product) =>
            searchKeyword
                ? product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                product.description.toLowerCase().includes(searchKeyword.toLowerCase())
                : true
        );

    return (
        <div className="product-list-container">
            <Sidebar onTypeSelect={handleTypeSelect} />
            <div className="product-list">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onClick={() => handleProductClick(product)}
                    />
                ))}
            </div>
            <ProductModal
                isOpen={!!selectedProduct}
                onClose={handleModalClose}
                product={selectedProduct}
            />
        </div>
    );
};

export default ProductList;



