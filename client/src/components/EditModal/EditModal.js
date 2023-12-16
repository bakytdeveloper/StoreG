//
// // client/src/components/EditModal/EditModal.js
// import React, { useState } from 'react';
// import './EditModal.css';
//
// const EditModal = ({ isOpen, onClose, products, onDeleteClick, onCardClick }) => {
//     const [confirmDelete, setConfirmDelete] = useState(null);
//
//     const handleDeleteClick = (productId) => {
//         setConfirmDelete(productId);
//     };
//
//     const handleConfirmDelete = () => {
//         onDeleteClick(confirmDelete);
//         setConfirmDelete(null);
//         onClose();
//     };
//
//     const handleCancelDelete = () => {
//         setConfirmDelete(null);
//         onClose();
//     };
//
//     return (
//         <>
//             {isOpen && (
//                 <div className="edit-modal-overlay">
//                     <div className="edit-modal">
//                         <div className="edit-modal-header">
//                             <h2>Редактирование карточек</h2>
//                             <button onClick={onClose}>&times;</button>
//                         </div>
//                         <div className="edit-modal-content">
//                             <ul>
//                                 {products &&
//                                 products.map((product) => (
//                                     <li key={product._id}>
//                                             <span onClick={() => onCardClick(product)}>
//                                                 {product.name}
//                                             </span>
//                                         <button onClick={() => handleDeleteClick(product._id)}>
//                                             Удалить
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                         {/* Добавим окно подтверждения удаления */}
//                         <hr/>
//                         {confirmDelete && (
//                             <div className="delete-confirmation">
//                                 <p>
//                                     Вы уверены, что хотите удалить
//                                     <span
//                                         style={{color: "red", fontStyle: "oblique"}}>
//                                         "{products.find(p => p._id === confirmDelete)?.name}"</span>?</p>
//                                 {/*Вы уверены, что хотите удалить "{products.find(p => p._id === confirmDelete)?.name}"?</p>*/}
//                                 <button onClick={handleConfirmDelete}>Да</button>
//                                 <button onClick={handleCancelDelete}>Отмена</button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };
//
// export default EditModal;
//
//
//
//
//
//


// // client/src/components/EditModal/EditModal.js
// import React, { useState } from 'react';
// import './EditModal.css';
//
// const EditModal = ({ isOpen, onClose, products, onDeleteClick, onCardClick }) => {
//     const [confirmDelete, setConfirmDelete] = useState(null);
//
//     const handleDeleteClick = (productId) => {
//         setConfirmDelete(productId);
//     };
//
//     const handleConfirmDelete = () => {
//         onDeleteClick(confirmDelete);
//         setConfirmDelete(null);
//         onClose();
//     };
//
//     const handleCancelDelete = () => {
//         setConfirmDelete(null);
//         onClose();
//     };
//
//     return (
//         <>
//             {isOpen && (
//                 <div className="edit-modal-overlay">
//                     <div className="edit-modal">
//                         <div className="edit-modal-header">
//                             <h2>Редактирование карточек</h2>
//                             <button onClick={onClose}>&times;</button>
//                         </div>
//                         <div className="edit-modal-content">
//                             <ul>
//                                 {Array.isArray(products) && products.length > 0 ? (
//                                     products.map((product) => (
//                                         <li key={product._id}>
//                                             <span onClick={() => onCardClick(product)}>
//                                                 {product.name}
//                                             </span>
//                                             <button onClick={() => handleDeleteClick(product._id)}>
//                                                 Удалить
//                                             </button>
//                                         </li>
//                                     ))
//                                 ) : (
//                                     <p>No products available</p>
//                                 )}
//                             </ul>
//                         </div>
//                         {/* Добавим окно подтверждения удаления */}
//                         <hr />
//                         {confirmDelete && (
//                             <div className="delete-confirmation">
//                                 <p>
//                                     Вы уверены, что хотите удалить
//                                     <span
//                                         style={{ color: "red", fontStyle: "oblique" }}>
//                                         "{products.find((p) => p._id === confirmDelete)?.name}"</span>?
//                                 </p>
//                                 <button onClick={handleConfirmDelete}>Да</button>
//                                 <button onClick={handleCancelDelete}>Отмена</button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };
//
// export default EditModal;






// client/src/components/EditModal/EditModal.js
import React, { useState } from 'react';
import './EditModal.css';

const EditModal = ({ isOpen, onClose, products, onDeleteClick, onCardClick }) => {
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    const handleDeleteClick = (productId) => {
        setProductIdToDelete(productId);
    };

    const handleConfirmDelete = () => {
        if (onDeleteClick) {
            onDeleteClick(productIdToDelete);
        }
        setProductIdToDelete(null);
        onClose();
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
