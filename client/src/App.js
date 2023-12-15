
// РАБОЧИЙ ХОРОШИЙ
import React, { useState } from 'react';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

const App = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handleAdminPasswordSubmit = (password) => {
    // Проверка введенного пароля
    if (password === 'Nurlan') {
      setAdminAuthenticated(true);
    }
  };

  return (
      <Router>
        <div className="app">
          <Header onSearch={handleSearch} />
          <Switch>
            <Route path="/nurlan_admin">
              {isAdminAuthenticated ? (
                  <AdminPanel />
              ) : (
                  <div className="password">
                    <p>Введите пароль</p>
                    <input className="inpPass"
                           type="password"
                           value={adminPassword}
                           onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <button onClick={() => handleAdminPasswordSubmit(adminPassword)}>
                      Войти
                    </button>
                  </div>
              )}
            </Route>
            <Route path="/" exact>
              <ProductList selectedType={selectedType} searchKeyword={searchKeyword} />
            </Route>
          </Switch>
        </div>
      </Router>
  );
};

export default App;
