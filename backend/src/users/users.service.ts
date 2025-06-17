import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'admin@example.com',
      password: '',
      name: 'Administrador',
      role: 'admin'
    },
    {
      id: 2,
      email: 'usuario@example.com',
      password: '',
      name: 'Usuario Test',
      role: 'user'
    }
  ];

  constructor() {
    // Hashear las contraseñas al inicializar
    this.hashPasswords();
  }

  private async hashPasswords() {
    for (const user of this.users) {
      if (user.email === 'admin@example.com') {
        user.password = await bcrypt.hash('admin123', 10);
      } else if (user.email === 'usuario@example.com') {
        user.password = await bcrypt.hash('usuario123', 10);
      }
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
} 