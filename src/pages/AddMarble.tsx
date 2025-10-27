import React from 'react';
import { Link } from 'react-router-dom';
import MarbleForm from '../components/MarbleForm';
import { useTranslation } from 'react-i18next';
import { authStorage } from '../api/authApi';

const AddMarble: React.FC = () => {
    const { t } = useTranslation();
    const isLoggedIn = !!authStorage.getToken();

    if (!isLoggedIn) {
        return (
            <div className="add-marble-page">
                <div className="auth-required">
                    <h2>{t('auth.loginRequired')}</h2>
                    <p>{t('auth.loginRequiredMessage')}</p>
                    <div className="auth-actions">
                        <Link to="/login" className="btn btn-primary">{t('auth.login')}</Link>
                        <Link to="/register" className="btn btn-secondary">{t('auth.register')}</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="add-marble-page">
            <div className="page-header">
                <h2>{t('form.title')}</h2>
                <p>{t('form.description')}</p>
            </div>
            <MarbleForm />
        </div>
    );
};

export default AddMarble;