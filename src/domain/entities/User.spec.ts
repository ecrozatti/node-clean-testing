import { User } from './User';

describe('User Entity', () => {
  it('should create a user with valid properties', () => {
    const user = new User('Alice', 'alice@example.com', '1');

    expect(user.id).toBe('1');
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@example.com');
  });

  it('should allow updating the user name and email', () => {
    const user = new User('Alice', 'alice@example.com', '1');

    user.name = 'Bob';
    user.email = 'bob@example.com';

    expect(user.name).toBe('Bob');
    expect(user.email).toBe('bob@example.com');
  });
});
