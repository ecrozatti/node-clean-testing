import { CreateUser } from '../../src/application/use-cases/CreateUser';
import { InMemoryUserRepository } from '../../src/infrastructure/repositories/InMemoryUserRepository';

describe('CreateUser Use Case', () => {
  let repository: InMemoryUserRepository;
  let createUser: CreateUser;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    createUser = new CreateUser(repository);
  });

  describe('Creating users', () => {
    it('should create a new user with valid data', async () => {
      const user = await createUser.execute('John Doe', 'john@example.com');

      expect(user).toHaveProperty('id');
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
    });

    it('should store the created user in the repository', async () => {
      const user = await createUser.execute('Alice', 'alice@example.com');
      const found = await repository.findById(user.id);

      expect(found).toEqual(user);
    });

    it('should not allow duplicate emails', async () => {
      await createUser.execute('Alice', 'alice@example.com');

      await expect(
        createUser.execute('Bob', 'alice@example.com')
      ).rejects.toThrow('Email already in use');
    });
  });

  describe('Repository user retrieval', () => {
    it('should find a user by id', async () => {
      const user = await createUser.execute('Test User', 'test@example.com');
      const foundUser = await repository.findById(user.id);

      expect(foundUser).not.toBeNull();
      expect(foundUser?.id).toBe(user.id);
    });

    it('should return null if user is not found by id', async () => {
      const foundUser = await repository.findById('non-existent-id');
      expect(foundUser).toBeNull();
    });
  });
});
