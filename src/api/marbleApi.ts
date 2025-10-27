export interface Marble {
    id?: number;
    name: string;
    description?: string;
    type: string;
    diameterInMm: number;
    color: string;
    material: string;
    weight: number;
    pattern: string;
    isRare: boolean;
    productionDate: string;
    imageUrl?: string;
}

const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://api.samyhama.fr/api/marbles'
    : 'http://127.0.0.1:5000/api/marbles';

export const marbleApi = {
    async getAll(): Promise<Marble[]> {
        const response = await fetch(API_URL);
        return response.json();
    },

    async create(marble: FormData, token: string): Promise<Marble> {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: marble
        });
        if (!response.ok) throw new Error('Failed to create marble');
        return response.json();
    }
};
