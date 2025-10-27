import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { authStorage } from '../api/authApi';

const Navbar: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!authStorage.getToken());
    }, [location]);

    const handleLogout = () => {
        authStorage.removeToken();
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand-link">
                    <h1>Marble Collection</h1>
                </Link>
            </div>
            <div className="navbar-menu">
                <Link 
                    to="/" 
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                    {t('nav.gallery')}
                </Link>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="nav-link btn-logout">
                        {t('auth.logout')}
                    </button>
                ) : (
                    <Link to="/login" className="nav-link">
                        {t('auth.login')}
                    </Link>
                )}
                <LanguageSwitcher />
            </div>
        </nav>
    );
};

export default Navbar;