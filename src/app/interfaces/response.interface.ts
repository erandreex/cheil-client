export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface Pagination {
    totalUsers: number;
    pageNumber: number;
    pageSize: number;
    users: User[];
}
