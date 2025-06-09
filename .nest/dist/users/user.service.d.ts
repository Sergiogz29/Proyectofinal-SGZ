import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(email: string, name: string, password: string, role?: 'user' | 'admin'): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
}
