import React, { useState } from 'react';
import { marbleApi } from '../api/marbleApi';

const MarbleForm: React.FC = () => {
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
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="type">Type:</label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                    <option>Bille</option>
                    <option>Calot</option>
                    <option>Boulard</option>
                    <option>Mibs</option>
                    <option>Shooter</option>
                </select>
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
            </div>
            <button type="submit">Add Marble</button>
        </form>
    );
};

export default MarbleForm;
