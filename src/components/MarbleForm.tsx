import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { marbleApi } from '../api/marbleApi';

const MarbleForm: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'Bille',
        diameterInMm: 16,
        color: '',
        material: 'Glass',
        weight: 0,
        pattern: '',
        isRare: false,
        productionDate: today,
        image: null as File | null
    });
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('Name', formData.name);
            formDataToSend.append('Description', formData.description);
            formDataToSend.append('Type', formData.type);
            formDataToSend.append('DiameterInMm', formData.diameterInMm.toString());
            formDataToSend.append('Color', formData.color);
            formDataToSend.append('Material', formData.material);
            formDataToSend.append('Weight', formData.weight.toString());
            formDataToSend.append('Pattern', formData.pattern);
            formDataToSend.append('IsRare', formData.isRare.toString());
            formDataToSend.append('ProductionDate', formData.productionDate);
            if (formData.image) {
                formDataToSend.append('Image', formData.image);
            }
            
            await marbleApi.create(formDataToSend);
            setFormData({
                name: '',
                description: '',
                type: 'Bille',
                diameterInMm: 16,
                color: '',
                material: 'Glass',
                weight: 0,
                pattern: '',
                isRare: false,
                productionDate: today,
                image: null
            });
        } catch (error) {
            console.error('Error creating marble:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'file') {
            const file = (e.target as HTMLInputElement).files?.[0] || null;
            setFormData(prev => ({ ...prev, [name]: file }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="marble-form">
            <div className="form-group">
                <label>{t('form.name')}</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>{t('form.description')}</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                />
            </div>

            <div className="form-group">
                <label>{t('form.type')}</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="Bille">{t('marbleTypes.bille')}</option>
                    <option value="Calot">{t('marbleTypes.calot')}</option>
                    <option value="Boulard">{t('marbleTypes.boulard')}</option>
                    <option value="Mibs">{t('marbleTypes.mibs')}</option>
                    <option value="Shooter">{t('marbleTypes.shooter')}</option>
                </select>
            </div>

            <div className="form-group">
                <label>{t('form.diameterInMm')}</label>
                <input
                    type="number"
                    name="diameterInMm"
                    value={formData.diameterInMm}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                />
            </div>

            <div className="form-group">
                <label>{t('form.color')}</label>
                <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>{t('form.material')}</label>
                <select name="material" value={formData.material} onChange={handleChange}>
                    <option value="Glass">{t('materials.glass')}</option>
                    <option value="Terracotta">{t('materials.terracotta')}</option>
                    <option value="Steel">{t('materials.steel')}</option>
                    <option value="Marble">{t('materials.marble')}</option>
                    <option value="Wood">{t('materials.wood')}</option>
                    <option value="Clay">{t('materials.clay')}</option>
                    <option value="Porcelain">{t('materials.porcelain')}</option>
                    <option value="Agate">{t('materials.agate')}</option>
                    <option value="Ceramic">{t('materials.ceramic')}</option>
                </select>
            </div>

            <div className="form-group">
                <label>{t('form.weight')}</label>
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                />
            </div>

            <div className="form-group">
                <label>{t('form.pattern')}</label>
                <input
                    type="text"
                    name="pattern"
                    value={formData.pattern}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        name="isRare"
                        checked={formData.isRare}
                        onChange={handleChange}
                    />
                    <label>{t('form.isRare')}</label>
                </div>
            </div>

            <div className="form-group">
                <label>{t('form.productionDate')}</label>
                <input
                    type="date"
                    name="productionDate"
                    value={formData.productionDate}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>{t('form.image')}</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                />
            </div>

            <button type="submit" className="btn btn-primary">
                {t('form.submit')}
            </button>
        </form>
    );
};

export default MarbleForm;