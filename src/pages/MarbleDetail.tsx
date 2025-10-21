import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { marbleApi, Marble } from '../api/marbleApi';

const MarbleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [marble, setMarble] = useState<Marble | null>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchMarble = async () => {
            if (!id) return;
            try {
                const data = await marbleApi.getAll();
                const foundMarble = data.find(m => m.id === parseInt(id));
                setMarble(foundMarble || null);
            } catch (error) {
                console.error('Error fetching marble:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMarble();
    }, [id]);

    if (loading) {
        return <div className="loading">{t('common.loading')}</div>;
    }

    if (!marble) {
        return (
            <div className="not-found">
                <h2>{t('detail.notFound')}</h2>
                <Link to="/" className="btn btn-primary">{t('nav.backToGallery')}</Link>
            </div>
        );
    }

    return (
        <div className="marble-detail">
            <div className="detail-header">
                <Link to="/" className="back-btn">← {t('nav.backToGallery')}</Link>
                <h1>{marble.name}</h1>
            </div>
            
            <div className="detail-content">
                {marble.imageUrl && (
                    <div className="detail-image">
                        <img src={marble.imageUrl} alt={marble.name} />
                    </div>
                )}
                
                <div className="detail-info">
                    <div className="info-grid">
                        <div className="info-item">
                            <label>{t('form.type')}</label>
                            <span>{t(`marbleTypes.${marble.type.toLowerCase()}`)}</span>
                        </div>
                        <div className="info-item">
                            <label>{t('form.color')}</label>
                            <span>{marble.color}</span>
                        </div>
                        <div className="info-item">
                            <label>{t('form.material')}</label>
                            <span>{t(`materials.${marble.material.toLowerCase()}`)}</span>
                        </div>
                        <div className="info-item">
                            <label>{t('form.weight')}</label>
                            <span>{marble.weight}g</span>
                        </div>
                        <div className="info-item">
                            <label>{t('form.pattern')}</label>
                            <span>{marble.pattern}</span>
                        </div>
                        <div className="info-item">
                            <label>{t('form.productionDate')}</label>
                            <span>{new Date(marble.productionDate).toLocaleDateString()}</span>
                        </div>
                        <div className="info-item">
                            <label>{t('form.isRare')}</label>
                            <span className={`rare-badge ${marble.isRare ? 'rare' : 'common'}`}>
                                {marble.isRare ? t('form.rare') : t('form.common')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarbleDetail;