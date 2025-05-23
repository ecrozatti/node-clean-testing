import { InMemoryUserRepository } from './InMemoryUserRepository';
import { User } from '../../domain/entities/User';

describe('InMemoryUserRepository', () => {
  let repository: InMemoryUserRepository;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
  });

  it('should add and find a user by id', async () => {
    const user = new User('Alice', 'alice@example.com', '1');
    await repository.add(user);

    const found = await repository.findById('1');
    expect(found).toEqual(user);
  });

  it('should return null if user not found', async () => {
    const found = await repository.findById('999');
    expect(found).toBeNull();
  });

  it('should find a user by email', async () => {
    const user = new User('Alice', 'alice@example.com', '1');
    await repository.add(user);

    const found = await repository.findByEmail('alice@example.com');
    expect(found).toEqual(user);
  });

  it('should return null if email not found', async () => {
    const found = await repository.findByEmail('noone@example.com');
    expect(found).toBeNull();
  });
});
