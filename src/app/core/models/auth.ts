export interface LoginRequest {
    email: string;
    password: string;
}


export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: number;
    departementId: number;
}

export interface AuthResponse {
    token: string;
}