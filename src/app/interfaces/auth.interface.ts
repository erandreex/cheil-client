export interface LoginInterface {
    Email: string;
    Password: string;
}

export interface UserAuth {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    token: string;
    password?: string;
}
