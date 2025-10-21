import React from 'react';
import MarbleForm from '../components/MarbleForm';
import { useTranslation } from 'react-i18next';

const AddMarble: React.FC = () => {
    const { t } = useTranslation();

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