
// client/src/components/Sidebar/Sidebar.js
import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ onTypeSelect }) => {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await fetch('http://localhost:5500/products/types');
                const data = await response.json();

                console.log('Received types data:', data);

                if (Array.isArray(data)) {
                    setTypes(data);
                } else {
                    console.error('Invalid data format for types:', data);
                }
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };

        fetchTypes();
    }, []);

    const handleTypeClick = (type) => {
        setSelectedType(type);
        onTypeSelect(type); // Передаем выбранный тип обратно в родительский компонент
    };

    const handleShowAllClick = () => {
        setSelectedType(null);
        onTypeSelect(null); // Передаем null для отображения всех товаров
    };

    // const toggleSidebar = () => {
    //     setIsSidebarVisible(!isSidebarVisible);
    // };

    return (
        <aside className={`sidebar ${isSidebarVisible ? 'show-sidebar' : ''}`}>
            <h2>Тип товара</h2>
            <ul>
                <li className={!selectedType ? 'selected' : undefined} onClick={handleShowAllClick}>
                    Все товары
                </li>
                {types.map((type, index) => (
                    <li
                        key={index}
                        className={selectedType === type ? 'selected' : undefined}
                        onClick={() => handleTypeClick(type)}
                    >
                        {type}
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;




// [
//     {
//       "direction": "Бытовая техника",
//       "type": "Телевизор",
//       "brand": "VIZIO",
//       "images": ["https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/81pL+uVYD3L._AC_SX679_.jpg", "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71pSYE0G7OL._AC_SX679_.jpg"],
//       "name": "Smart TV D",
//       "description": "40-дюймовый Smart TV VIZIO серии D с разрешением Full HD 1080p, AMD FreeSync, встроенным Apple AirPlay и Chromecast, совместимостью с Alexa, D40f-J09, модель 2022 г..",
//       "price": 799.99,
//       "characteristics": [
//         {"name": "Экрана", "value": "40 дюймов"},
//         {"name": "Поддерживаемые услуги", "value": "Netflix, Disney+, YouTube, HBO Max"}
//       ]
//     },
//     {
//       "direction": "Одежда",
//       "type": "Ботинки",
//       "brand": "Nike",
//       "images": ["https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61c0o8n1LjL._AC_SY695_.jpg",
//        "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/61tD2mTthiL._AC_SY695_.jpg",
//        "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/712blF+gvAL._AC_SY695_.jpg"],
//       "name": "City",
//       "description": "Женские классические ботинки Nike City Wheat/Sail, черные (DQ5601 710).",
//       "price": 129.99,
//       "characteristics": [
//         {"name": "Цвет", "value": "Черный"},
//         {"name": "Материал подошвы", "value": "Резина"},
//         {"name": "Высота вала", "value": "Ремешок на щиколотке"}
//       ]
//     },
//   ]