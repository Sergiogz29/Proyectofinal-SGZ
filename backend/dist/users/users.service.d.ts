export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
}
export declare class UsersService {
    private readonly users;
    constructor();
    private hashPasswords;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: number): Promise<User | undefined>;
}
