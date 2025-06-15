import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  // Endpoint temporal para crear un usuario admin
  @Post('register-admin')
  async registerAdmin() {
    // Verifica si ya existe el usuario admin
    const exists = await this.usersRepository.findOne({ where: { username: 'admin' } });
    if (exists) return { message: 'Ya existe el admin' };

    const user = new User();
    user.username = 'admin';
    user.password = 'admin123'; // Para pruebas, sin encriptar
    user.isAdmin = true;
    await this.usersRepository.save(user);
    return { message: 'Admin creado', user };
  }
}