import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand-link">
                    <h1>Marble Collection</h1>
                </Link>
            </div>
            <LanguageSwitcher />
            <div className="navbar-menu">
                
                <Link 
                    to="/" 
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                    {t('nav.gallery')}
                </Link>
                
            </div>
        </nav>
    );
};

export default Navbar;