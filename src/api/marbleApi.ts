export interface Marble {
    id?: number;
    name: string;
    type: string;
    color: string;
    material: string;
    weight: number;
    pattern: string;
    isRare: boolean;
    productionDate: string;
    imageUrl?: string;
}

const API_URL = 'http://localhost:5162/api/marbles';

export const marbleApi = {
    async getAll(): Promise<Marble[]> {
        const response = await fetch(API_URL);
        return response.json();
    },

    async create(marble: FormData): Promise<Marble> {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: marble
        });
        return response.json();
    }
};
