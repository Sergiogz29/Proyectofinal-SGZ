import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class AuthController {
    private authService;
    private usersRepository;
    constructor(authService: AuthService, usersRepository: Repository<User>);
    login(loginDto: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    registerAdmin(): Promise<{
        message: string;
        user?: undefined;
    } | {
        message: string;
        user: User;
    }>;
}
