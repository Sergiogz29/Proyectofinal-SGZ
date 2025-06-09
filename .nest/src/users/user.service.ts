// .nest/src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
  ) {}

  // ▷ tipo de role restringido a 'user'|'admin'
  async create(
    email: string,
    name: string,
    password: string,
    role: 'user' | 'admin' = 'user'
  ): Promise<User> {
    const hash = await bcrypt.hash(password, 10);
    const user = this.repo.create({ email, name, password: hash, role });
    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }
}
