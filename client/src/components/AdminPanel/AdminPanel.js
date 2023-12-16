//
//
//
// import React, { useState, useEffect } from 'react';
// import './AdminPanel.css';
// import EditModal from './../EditModal/EditModal';
//
// const AdminPanel = () => {
//     const [newProduct, setNewProduct] = useState({
//         type: '',
//         name: '',
//         description: '',
//         price: '',
//         images: [],
//         specifications: {},
//     });
//     const [currentProduct, setCurrentProduct] = useState(null);
//     const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
//     const [updateConfirmationOpen, setUpdateConfirmationOpen] = useState(false);
//
//     const [isEditModalOpen, setEditModalOpen] = useState(false);
//     const [products, setProducts] = useState([]);
//
//     useEffect(() => {
//         fetch('http://localhost:5500/products')
//             .then(response => response.json())
//             .then(data => setProducts(data))
//             .catch(error => console.error('Error fetching products:', error));
//     }, []);
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewProduct((prevProduct) => ({
//             ...prevProduct,
//             [name]: value,
//         }));
//     };
//
//     const handleAddImage = (e) => {
//         const files = e.target.files;
//         if (files.length > 0) {
//             const newImages = Array.from(files).map(file => URL.createObjectURL(file));
//             setNewProduct((prevProduct) => ({
//                 ...prevProduct,
//                 images: [...prevProduct.images, ...newImages],
//             }));
//         }
//     };
//
//     const handleRemoveImage = (index) => {
//         const updatedImages = [...newProduct.images];
//         updatedImages.splice(index, 1);
//         setNewProduct((prevProduct) => ({
//             ...prevProduct,
//             images: updatedImages,
//         }));
//     };
//
//     const handleAddSpecification = () => {
//         setNewProduct((prevProduct) => ({
//             ...prevProduct,
//             specifications: {
//                 ...prevProduct.specifications,
//                 [`${Date.now()}`]: { key: '', value: '' },
//             },
//         }));
//     };
//
//     const handleRemoveSpecification = (key) => {
//         const updatedSpecifications = { ...newProduct.specifications };
//         delete updatedSpecifications[key];
//         setNewProduct((prevProduct) => ({
//             ...prevProduct,
//             specifications: updatedSpecifications,
//         }));
//     };
//
//     const handleSpecificationChange = (key, field, value) => {
//         setNewProduct((prevProduct) => ({
//             ...prevProduct,
//             specifications: {
//                 ...prevProduct.specifications,
//                 [key]: {
//                     ...prevProduct.specifications[key],
//                     [field]: value,
//                 },
//             },
//         }));
//     };
//
//     const fetchProducts = async () => {
//         try {
//             const response = await fetch('http://localhost:5500/products');
//             if (!response.ok) {
//                 throw new Error('Error fetching products');
//             }
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error('Error fetching products:', error);
//             return [];
//         }
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         try {
//             let url = 'http://localhost:5500/products';
//             let method = 'POST';
//             const requestBody = { ...newProduct };
//
//             if (currentProduct) {
//                 url += `/${currentProduct._id}`;
//                 method = 'PUT';
//             }
//
//             const specs = {};
//             Object.entries(requestBody.specifications).forEach(([key, value]) => {
//                 specs[value.key] = value.value;
//             });
//
//             requestBody.specifications = specs;
//
//             const response = await fetch(url, {
//                 method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestBody),
//             });
//
//             if (!response.ok) {
//                 const responseData = await response.json();
//                 console.error(`Error ${currentProduct ? 'updating' : 'creating'} product:`, responseData);
//                 throw new Error(`Error ${currentProduct ? 'updating' : 'creating'} product`);
//             }
//
//             setNewProduct({
//                 type: '',
//                 name: '',
//                 description: '',
//                 price: '',
//                 images: [],
//                 specifications: {},
//             });
//             setCurrentProduct(null);
//             setEditModalOpen(false);
//
//             const updatedProducts = await fetchProducts();
//             setProducts(updatedProducts);
//         } catch (error) {
//             console.error('Error submitting product:', error);
//         }
//     };
//
//     const handleEditClick = () => {
//         setEditModalOpen(true);
//     };
//
//     const handleCardClick = (product) => {
//         setCurrentProduct(product);
//         const { name, description, price, images, specifications, type } = product;
//         setNewProduct({
//             name,
//             description,
//             price,
//             images,
//             type,
//             specifications: Object.entries(specifications).map(([key, value]) => ({ key, value })),
//         });
//         setEditModalOpen(false);
//         setUpdateConfirmationOpen(true); // Show update confirmation modal
//     };
//
//     const handleDeleteClick = (productId) => {
//         setCurrentProduct(productId);
//         setDeleteConfirmationOpen(true);
//     };
//
//     const handleConfirmDelete = async () => {
//         try {
//             const response = await fetch(`http://localhost:5500/products/${currentProduct}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(`Error deleting product: ${JSON.stringify(errorData)}`);
//             }
//
//             const updatedProducts = await fetchProducts();
//             setProducts(updatedProducts);
//             setDeleteConfirmationOpen(false);
//         } catch (error) {
//             console.error(error.message);
//         }
//     };
//
//     const handleUpdateConfirmation = async () => {
//         try {
//             const response = await fetch(`http://localhost:5500/products/${currentProduct._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newProduct),
//             });
//
//             if (!response.ok) {
//                 const responseData = await response.json();
//                 console.error('Error updating product:', responseData);
//                 throw new Error('Error updating product');
//             }
//
//             const updatedProducts = await fetchProducts();
//             setProducts(updatedProducts);
//             setUpdateConfirmationOpen(false);
//         } catch (error) {
//             console.error('Error updating product:', error);
//         }
//     };
//
//     return (
//         <div className="admin-panel">
//             <div className="admin-panel-content">
//                 <h2 className="admin-panel-title">Админ-панель</h2>
//                 <form className="admin-panel-form" onSubmit={handleSubmit}>
//                     <div className="admin-panel-fields">
//                         <label htmlFor="name">Название:</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={newProduct.name}
//                             onChange={handleInputChange}
//                             required
//                         />
//
//                         <label htmlFor="type">Тип:</label>
//                         <input
//                             type="text"
//                             id="type"
//                             name="type"
//                             value={newProduct.type}
//                             onChange={handleInputChange}
//                             required
//                         />
//
//                         <label htmlFor="description">Описание:</label>
//                         <textarea
//                             id="description"
//                             name="description"
//                             value={newProduct.description}
//                             onChange={handleInputChange}
//                             required
//                         ></textarea>
//
//                         <label htmlFor="price">Цена:</label>
//                         <input
//                             type="number"
//                             id="price"
//                             name="price"
//                             value={newProduct.price}
//                             onChange={handleInputChange}
//                             required
//                         />
//
//                         <label htmlFor="images">Изображения:</label>
//                         <input
//                             type="file"
//                             id="images"
//                             name="images"
//                             accept="image/*"
//                             onChange={handleAddImage}
//                             multiple
//                         />
//                         <div className="admin-panel-preview">
//                             {newProduct.images.map((image, index) => (
//                                 <div key={index} className="admin-panel-image-preview">
//                                     <img src={image} alt={`Preview ${index + 1}`} />
//                                     <button
//                                         type="button"
//                                         onClick={() => handleRemoveImage(index)}
//                                         className="admin-panel-remove-image"
//                                     >
//                                         Удалить изображение
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//
//                         <div className="admin-panel-specifications">
//                             <h3>Характеристики</h3>
//                             {Object.entries(newProduct.specifications).map(([key, specification]) => (
//                                 <div key={key} className="admin-panel-specification">
//                                     <input
//                                         type="text"
//                                         placeholder="Ключ"
//                                         value={specification.key}
//                                         onChange={(e) => handleSpecificationChange(key, 'key', e.target.value)}
//                                     />
//                                     <input
//                                         style={{width: "110%"}}
//                                         type="text"
//                                         placeholder="Значение"
//                                         value={specification.value}
//                                         onChange={(e) => handleSpecificationChange(key, 'value', e.target.value)}
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => handleRemoveSpecification(key)}
//                                         className="admin-panel-remove-specification"
//                                     >
//                                         &#10006;
//                                     </button>
//                                 </div>
//                             ))}
//                             <button
//                                 type="button"
//                                 onClick={handleAddSpecification}
//                                 className="admin-panel-add-specification"
//                             >
//                                 Добавить характеристику
//                             </button>
//                         </div>
//
//                         <button type="button" onClick={handleEditClick} className="admin-panel-edit-button">
//                             Редактировать
//                         </button>
//
//                         <button type="submit" className="admin-panel-submit">
//                             Добавить товар
//                         </button>
//                     </div>
//                 </form>
//             </div>
//
//             <EditModal
//                 isOpen={isEditModalOpen}
//                 onClose={() => setEditModalOpen(false)}
//                 products={products}
//                 onCardClick={handleCardClick}
//                 onDeleteClick={handleDeleteClick}
//                 onUpdateClick={handleUpdateConfirmation} // Updated callback for update confirmation
//             />
//
//             {/* Модальное окно подтверждения обновления */}
//             {updateConfirmationOpen && (
//                 <div className="update-confirmation-modal">
//                     <p>Вы уверены, что хотите обновить товар?</p>
//                     <button type="button" onClick={handleUpdateConfirmation}>
//                         Да
//                     </button>
//                     <button type="button" onClick={() => setUpdateConfirmationOpen(false)}>
//                         Отмена
//                     </button>
//                 </div>
//             )}
//
//             {/* Модальное окно подтверждения удаления */}
//             {deleteConfirmationOpen && (
//                 <div className="delete-confirmation-modal">
//                     <p>Вы уверены, что хотите удалить товар?</p>
//                     <button type="button" onClick={handleConfirmDelete}>
//                         Да
//                     </button>
//                     <button type="button" onClick={() => setDeleteConfirmationOpen(false)}>
//                         Отмена
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default AdminPanel;






import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import EditModal from './../EditModal/EditModal';

const AdminPanel = () => {
    const [newProduct, setNewProduct] = useState({
        type: '',
        name: '',
        description: '',
        price: '',
        images: [],
        specifications: {},
    });
    const [currentProduct, setCurrentProduct] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [updateConfirmationOpen, setUpdateConfirmationOpen] = useState(false);

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [imageURLs, setImageURLs] = useState([]); // New state for image URLs

    useEffect(() => {
        fetch('http://localhost:5500/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleAddImage = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const newImages = Array.from(files).map((file, index) => {
                const imageURL = URL.createObjectURL(file);
                setImageURLs((prevURLs) => [...prevURLs, imageURL]);
                return imageURL;
            });

            setNewProduct((prevProduct) => ({
                ...prevProduct,
                images: [...prevProduct.images, ...newImages],
            }));
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...newProduct.images];
        updatedImages.splice(index, 1);

        URL.revokeObjectURL(imageURLs[index]);

        setImageURLs((prevURLs) => {
            const newURLs = [...prevURLs];
            newURLs.splice(index, 1);
            return newURLs;
        });

        setNewProduct((prevProduct) => ({
            ...prevProduct,
            images: updatedImages,
        }));
    };

    const handleAddSpecification = () => {
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            specifications: {
                ...prevProduct.specifications,
                [`${Date.now()}`]: { key: '', value: '' },
            },
        }));
    };

    const handleRemoveSpecification = (key) => {
        const updatedSpecifications = { ...newProduct.specifications };
        delete updatedSpecifications[key];
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            specifications: updatedSpecifications,
        }));
    };

    const handleSpecificationChange = (key, field, value) => {
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            specifications: {
                ...prevProduct.specifications,
                [key]: {
                    ...prevProduct.specifications[key],
                    [field]: value,
                },
            },
        }));
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5500/products');
            if (!response.ok) {
                throw new Error('Error fetching products');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let url = 'http://localhost:5500/products';
            let method = 'POST';
            const requestBody = { ...newProduct };

            if (currentProduct) {
                url += `/${currentProduct._id}`;
                method = 'PUT';
            }

            const specs = {};
            Object.entries(requestBody.specifications).forEach(([key, value]) => {
                specs[value.key] = value.value;
            });

            requestBody.specifications = specs;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const responseData = await response.json();
                console.error(`Error ${currentProduct ? 'updating' : 'creating'} product:`, responseData);
                throw new Error(`Error ${currentProduct ? 'updating' : 'creating'} product`);
            }

            setNewProduct({
                type: '',
                name: '',
                description: '',
                price: '',
                images: [],
                specifications: {},
            });
            setCurrentProduct(null);
            setEditModalOpen(false);

            const updatedProducts = await fetchProducts();
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    const handleEditClick = () => {
        setEditModalOpen(true);
    };

    const handleCardClick = (product) => {
        setCurrentProduct(product);
        const { name, description, price, images, specifications, type } = product;
        setNewProduct({
            name,
            description,
            price,
            images,
            type,
            specifications: Object.entries(specifications).map(([key, value]) => ({ key, value })),
        });
        setEditModalOpen(false);
        setUpdateConfirmationOpen(true); // Show update confirmation modal
    };

    const handleDeleteClick = (productId) => {
        setCurrentProduct(productId);
        setDeleteConfirmationOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5500/products/${currentProduct}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error deleting product: ${JSON.stringify(errorData)}`);
            }

            const updatedProducts = await fetchProducts();
            setProducts(updatedProducts);
            setDeleteConfirmationOpen(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleUpdateConfirmation = async () => {
        try {
            const response = await fetch(`http://localhost:5500/products/${currentProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                const responseData = await response.json();
                console.error('Error updating product:', responseData);
                throw new Error('Error updating product');
            }

            const updatedProducts = await fetchProducts();
            setProducts(updatedProducts);
            setUpdateConfirmationOpen(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="admin-panel">
            <div className="admin-panel-content">
                <h2 className="admin-panel-title">Админ-панель</h2>
                <form className="admin-panel-form" onSubmit={handleSubmit}>
                    <div className="admin-panel-fields">
                        <label htmlFor="name">Название:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="type">Тип:</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            value={newProduct.type}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="description">Описание:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            required
                        ></textarea>

                        <label htmlFor="price">Цена:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="images">Изображения:</label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            accept="image/*"
                            onChange={handleAddImage}
                            multiple
                        />
                        <div className="admin-panel-preview">
                            {newProduct.images.map((image, index) => (
                                <div key={index} className="admin-panel-image-preview">
                                    <img src={image} alt={`Preview ${index + 1}`} />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="admin-panel-remove-image"
                                    >
                                        Удалить изображение
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="admin-panel-specifications">
                            <h3>Характеристики</h3>
                            {Object.entries(newProduct.specifications).map(([key, specification]) => (
                                <div key={key} className="admin-panel-specification">
                                    <input
                                        type="text"
                                        placeholder="Ключ"
                                        value={specification.key}
                                        onChange={(e) => handleSpecificationChange(key, 'key', e.target.value)}
                                    />
                                    <input
                                        style={{width: "110%"}}
                                        type="text"
                                        placeholder="Значение"
                                        value={specification.value}
                                        onChange={(e) => handleSpecificationChange(key, 'value', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSpecification(key)}
                                        className="admin-panel-remove-specification"
                                    >
                                        &#10006;
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddSpecification}
                                className="admin-panel-add-specification"
                            >
                                Добавить характеристику
                            </button>
                        </div>

                        <button type="button" onClick={handleEditClick} className="admin-panel-edit-button">
                            Редактировать
                        </button>

                        <button type="submit" className="admin-panel-submit">
                            Добавить товар
                        </button>
                    </div>
                </form>
            </div>

            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                products={products}
                onCardClick={handleCardClick}
                onDeleteClick={handleDeleteClick}
                onUpdateClick={handleUpdateConfirmation}
            />

            {/* Модальное окно подтверждения обновления */}
            {updateConfirmationOpen && (
                <div className="update-confirmation-modal">
                    <p>Вы уверены, что хотите обновить товар?</p>
                    <button type="button" onClick={handleUpdateConfirmation}>
                        Да
                    </button>
                    <button type="button" onClick={() => setUpdateConfirmationOpen(false)}>
                        Отмена
                    </button>
                </div>
            )}

            {/* Модальное окно подтверждения удаления */}
            {deleteConfirmationOpen && (
                <div className="delete-confirmation-modal">
                    <p>Вы уверены, что хотите удалить товар?</p>
                    <button type="button" onClick={handleConfirmDelete}>
                        Да
                    </button>
                    <button type="button" onClick={() => setDeleteConfirmationOpen(false)}>
                        Отмена
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
