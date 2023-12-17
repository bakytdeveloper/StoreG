
//
// import React, { useState } from 'react';
// import './AddProductForm.css';
//
// const AddProductForm = ({ onSubmit }) => {
//     const [formData, setFormData] = useState({
//         type: '',
//         name: '',
//         description: '',
//         price: '',
//         images: [],
//         specifications: {},
//     });
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };
//
//     const handleSpecificationChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             specifications: {
//                 ...prevData.specifications,
//                 [name]: value,
//             },
//         }));
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(formData);
//     };
//
//     return (
//         <form className="add-product-form" onSubmit={handleSubmit}>
//             <label>
//                 Type:
//                 <input type="text" name="type" value={formData.type} onChange={handleChange} required />
//             </label>
//             <label>
//                 Name:
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//             </label>
//             <label>
//                 Description:
//                 <textarea name="description" value={formData.description} onChange={handleChange} required />
//             </label>
//             <label>
//                 Price:
//                 <input type="number" name="price" value={formData.price} onChange={handleChange} required />
//             </label>
//             <label>
//                 Images URL (comma-separated):
//                 <input type="text" name="images" value={formData.images.join(',')} onChange={handleChange} required />
//             </label>
//             <label>
//                 Specifications:
//                 <div className="specifications">
//                     <label>
//                         Color:
//                         <input
//                             type="text"
//                             name="color"
//                             value={formData.specifications.color || ''}
//                             onChange={handleSpecificationChange}
//                         />
//                     </label>
//                     <label>
//                         Screen:
//                         <input
//                             type="text"
//                             name="screen"
//                             value={formData.specifications.screen || ''}
//                             onChange={handleSpecificationChange}
//                         />
//                     </label>
//                     <label>
//                         Screen Size:
//                         <input
//                             type="text"
//                             name="screenSize"
//                             value={formData.specifications.screenSize || ''}
//                             onChange={handleSpecificationChange}
//                         />
//                     </label>
//
//                 </div>
//             </label>
//             <button type="submit">Add Product</button>
//         </form>
//     );
// };
//
// export default AddProductForm;
