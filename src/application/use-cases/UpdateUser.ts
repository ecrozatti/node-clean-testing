import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { NotFoundError } from '../../shared/errors/NotFoundError';

export class UpdateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, name: string, email: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const existingUserWithEmail = await this.userRepository.findByEmail(email);
    if (existingUserWithEmail && existingUserWithEmail.id !== id) {
      throw new Error('Email already in use');
    }

    user.name = name;
    user.email = email;

    await this.userRepository.update(user);

    return user;
  }
}
