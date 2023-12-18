
// src/components/Header/Header.js
import React, { useState } from 'react';
// import { FaInstagram, FaWhatsapp, FaTiktok, FaTelegram } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import ins from "./instagram.png"
import tel from "./telegram.png"
import what from "./whatsapp.png"
import tik from "./tik-tok.png"
import './Header.css';
// import {hover} from "@testing-library/user-event/dist/hover";

const Header = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const history = useHistory();

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleTitleClick = () => {
        // Очищаем поле поиска и перезагружаем страницу при клике на заголовок
        setSearchTerm('');
        history.push('/');
        window.location.reload(); // Это перезагрузит страницу
    };

    return (
        <header className="header">
            <div className="left-section">
                <Link to="/" className="site-name" onClick={handleTitleClick}>
                    <h1 className="site-name"> Tech <span className="sp">Store</span></h1>
                </Link>
            </div>
            <div className="social-icons">
                {/*<FaInstagram className="icon" onClick={() => window.open('https://www.instagram.com/')} />*/}

                <a   href="https://www.instagram.com/" target="_blank">
                    <img className="icon" src={ins} alt="Instagram Icon" />
                </a>

                <a href="https://web.whatsapp.com/" target="_blank">
                    <img className="icon" src={what} alt="Instagram Icon" />
                </a>


                {/*<FaWhatsapp className="icon" onClick={() => window.open('https://web.whatsapp.com/')} />*/}
                <a className="phone-number" href="tel:+996312517582">XXX-XX-XX-XX</a>
                {/*<FaTiktok className="icon" onClick={() => window.open('https://www.tiktok.com/')} />*/}
                {/*<FaTelegram className="icon" onClick={() => window.open('https://web.telegram.org/')} />*/}

                <a className="icon"  href="https://www.tiktok.com/" target="_blank">
                    <img src={tik} alt="Instagram Icon" />
                </a>

                <a className="icon"  href="https://web.telegram.org/" target="_blank">
                    <img src={tel} alt="Instagram Icon" />
                </a>

            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <FiSearch className="search-icon" />
            </div>
        </header>
    );
};

export default Header;

