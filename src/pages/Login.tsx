import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authApi, authStorage } from '../api/authApi';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await authApi.login(formData);
            authStorage.setToken(response.token);
            navigate('/');
        } catch (err) {
            setError(t('auth.loginError'));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="auth-page">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>{t('auth.login')}</h2>
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                    <label>{t('auth.email')}</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>{t('auth.password')}</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">{t('auth.login')}</button>
                <p className="auth-link">
                    {t('auth.noAccount')} <Link to="/register">{t('auth.register')}</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
