import { CreateUser } from '../../../application/use-cases/CreateUser';
import { GetUserById } from '../../../application/use-cases/GetUserById';
import { ListUsers } from '../../../application/use-cases/ListUsers';
import { UpdateUser } from '../../../application/use-cases/UpdateUser';
import { DeleteUser } from '../../../application/use-cases/DeleteUser';
import { User } from '../../../domain/entities/User';

export class UserController {
  constructor(
    private createUser: CreateUser,
    private getUserById: GetUserById,
    private listUsers: ListUsers,
    private updateUser: UpdateUser,
    private deleteUser: DeleteUser,
  ) {}

  async create(request: { name: string; email: string }): Promise<User> {
    return this.createUser.execute(request.name, request.email);
  }

  async getById(id: string): Promise<User> {
    return await this.getUserById.execute(id);
  }

  async getAll(): Promise<User[]> {
    return await this.listUsers.execute();
  }

  async update(request: {
    id: string;
    name: string;
    email: string;
  }): Promise<User> {
    return await this.updateUser.execute(
      request.id,
      request.name,
      request.email,
    );
  }

  async delete(id: string): Promise<void> {
    await this.deleteUser.execute(id);
  }
}
