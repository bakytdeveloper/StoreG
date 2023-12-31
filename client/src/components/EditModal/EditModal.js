


// client/src/components/EditModal/EditModal.js
import React, { useState } from 'react';
import './EditModal.css';

const EditModal = ({ isOpen, onClose, products, onDeleteClick, onCardClick }) => {
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    const handleDeleteClick = (productId) => {
        setProductIdToDelete(productId);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5500/products/${productIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error deleting product: ${JSON.stringify(errorData)}`);
            }

            if (onDeleteClick) {
                onDeleteClick(productIdToDelete);
            }

            setProductIdToDelete(null);
            onClose();
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleCancelDelete = () => {
        setProductIdToDelete(null);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="edit-modal-overlay">
                    <div className="edit-modal">
                        <div className="edit-modal-header">
                            <h2>Редактирование карточек</h2>
                            <button onClick={onClose}>&times;</button>
                        </div>
                        <div className="edit-modal-content">
                            <ul>
                                {Array.isArray(products) && products.length > 0 ? (
                                    products.map((product) => (
                                        <li key={product._id}>
                                            <span onClick={() => onCardClick(product)}>
                                                {product.name}
                                            </span>
                                            <button onClick={() => handleDeleteClick(product._id)}>
                                                Удалить
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <p>No products available</p>
                                )}
                            </ul>
                        </div>
                        {/* Добавим окно подтверждения удаления */}
                        <hr />
                        {productIdToDelete && (
                            <div className="delete-confirmation">
                                <p>
                                    Вы уверены, что хотите удалить
                                    <span
                                        style={{ color: "red", fontStyle: "oblique" }}>
                                        "{products.find((p) => p._id === productIdToDelete)?.name}"</span>?
                                </p>
                                <button onClick={handleConfirmDelete}>Да</button>
                                <button onClick={handleCancelDelete}>Отмена</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default EditModal;

