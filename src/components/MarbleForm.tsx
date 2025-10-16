import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { marbleApi } from '../api/marbleApi';

const MarbleForm: React.FC = () => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [type, setType] = useState('Bille');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('type', type);
        if (image) formData.append('image', image);

        try {
            await marbleApi.create(formData);
            setName('');
            setImage(null);
        } catch (error) {
            console.error('Error creating marble:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">{t('form.name')}:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="type">{t('form.type')}:</label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                    {Object.keys(t('form.marbleTypes', { returnObjects: true })).map(type => (
                        <option key={type} value={type}>
                            {t(`form.marbleTypes.${type}`)}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="image">{t('form.image')}:</label>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
            </div>
            <button type="submit">{t('form.submit')}</button>
        </form>
    );
};

export default MarbleForm;
