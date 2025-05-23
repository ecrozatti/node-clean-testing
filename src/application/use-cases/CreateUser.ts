import { validateOrReject } from 'class-validator';

import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(name: string, email: string): Promise<User> {
    const user = new User(name, email);

    await validateOrReject(user);

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email already in use');
    }

    await this.userRepository.add(user);
    return user;
  }
}
