import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { marbleApi, Marble } from '../api/marbleApi';

const MarbleGallery: React.FC = () => {
    const [marbles, setMarbles] = useState<Marble[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchMarbles = async () => {
            try {
                const data = await marbleApi.getAll();
                setMarbles(data);
            } catch (error) {
                console.error('Error fetching marbles:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMarbles();
    }, []);

    if (loading) {
        return <div className="loading">{t('common.loading')}</div>;
    }

    return (
        <div className="gallery">
            <div className="gallery-header">
                <div className="gallery-title">
                    <h2>{t('gallery.title')}</h2>
                    <p>{t('gallery.subtitle')}</p>
                </div>
                <Link to="/add" className="btn btn-primary add-marble-btn">{t('nav.addMarble')}</Link>
            </div>
            <div className="marble-grid">
                {marbles.map((marble) => (
                    <Link key={marble.id} to={`/marble/${marble.id}`} className="marble-card">
                        <div className="marble-image">
                            {marble.imageUrl ? (
                                <img src={marble.imageUrl} alt={marble.name} />
                            ) : (
                                <div className="no-image">
                                    <span>📿</span>
                                </div>
                            )}
                        </div>
                        <div className="marble-info">
                            <h3>{marble.name}</h3>
                            <p className="marble-type">{t(`marbleTypes.${marble.type.toLowerCase()}`)}</p>
                            <p className="marble-material">{t(`materials.${marble.material.toLowerCase()}`)}</p>
                            {marble.isRare && <span className="rare-badge">{t('form.rare')}</span>}
                        </div>
                    </Link>
                ))}
            </div>
            {marbles.length === 0 && (
                <div className="empty-gallery">
                    <h3>{t('gallery.empty')}</h3>
                    <p>{t('gallery.emptyDescription')}</p>
                </div>
            )}
        </div>
    );
};

export default MarbleGallery;
