
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

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <aside className={`sidebar ${isSidebarVisible ? 'show-sidebar' : ''}`}>
            <h2>Types</h2>
            {/*<div className="toggle-button" onClick={toggleSidebar}>*/}
            {/*    ☰*/}
            {/*</div>*/}
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




