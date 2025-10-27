const API_BASE = process.env.NODE_ENV === 'production' 
    ? 'https://api.samyhama.fr/api/auth'
    : 'http://127.0.0.1:5000/api/auth';

export interface RegisterDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface UserResponseDto {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    provider?: string;
    createdAt: string;
}

export interface AuthResponseDto {
    token: string;
    user: UserResponseDto;
}

export const authApi = {
    async register(data: RegisterDto): Promise<AuthResponseDto> {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Registration failed');
        return response.json();
    },

    async login(data: LoginDto): Promise<AuthResponseDto> {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Login failed');
        return response.json();
    },

    async me(token: string): Promise<UserResponseDto> {
        const response = await fetch(`${API_BASE}/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch user');
        return response.json();
    }
};

export const authStorage = {
    setToken(token: string) {
        localStorage.setItem('auth_token', token);
    },
    
    getToken(): string | null {
        return localStorage.getItem('auth_token');
    },
    
    removeToken() {
        localStorage.removeItem('auth_token');
    }
};
