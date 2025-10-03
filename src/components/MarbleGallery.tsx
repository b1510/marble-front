import React, { useEffect, useState } from 'react';
import { marbleApi, Marble } from '../api/marbleApi';

const MarbleGallery: React.FC = () => {
    const [marbles, setMarbles] = useState<Marble[]>([]);

    useEffect(() => {
        const fetchMarbles = async () => {
            try {
                const data = await marbleApi.getAll();
                setMarbles(data);
            } catch (error) {
                console.error('Error fetching marbles:', error);
            }
        };
        fetchMarbles();
    }, []);

    return (
        <div className="gallery">
            {marbles.map((marble) => (
                <div key={marble.id} className="marble-card">
                    {marble.imageUrl && (
                        <img src={marble.imageUrl} alt={marble.name} />
                    )}
                    <h3>{marble.name}</h3>
                    <p>Type: {marble.type}</p>
                    <p>Material: {marble.material}</p>
                </div>
            ))}
        </div>
    );
};

export default MarbleGallery;
