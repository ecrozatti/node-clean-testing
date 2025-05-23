import request from 'supertest';
import express from 'express';
import { createTestServer } from '../helpers/createTestApp';

describe('User Routes', () => {
  let app: express.Express;

  beforeEach(() => {
    app = createTestServer();
  });

  it('should create a user successfully', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'John Doe', email: 'john@example.com' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
    expect(response.body.email).toBe('john@example.com');
  });

  it('should not allow duplicate emails', async () => {
    await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' });

    const response = await request(app)
      .post('/users')
      .send({ name: 'Bob', email: 'alice@example.com' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Email already in use');
  });

  it('should fail when name is missing', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'invalid@example.com' });

    expect(response.status).toBe(400);
  });

  it('should fail when email is invalid', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Invalid', email: 'not-an-email' });

    expect(response.status).toBe(400);
  });

  it('should list all users', async () => {
    await request(app)
      .post('/users')
      .send({ name: 'User One', email: 'user1@example.com' });

    await request(app)
      .post('/users')
      .send({ name: 'User Two', email: 'user2@example.com' });

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('email');
  });

  it('should get user by id', async () => {
    const createResponse = await request(app)
      .post('/users')
      .send({ name: 'User X', email: 'x@example.com' });

    const id = createResponse.body.id;

    const response = await request(app).get(`/users/${id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('User X');
    expect(response.body.email).toBe('x@example.com');
  });

  it('should update user by id', async () => {
    const createResponse = await request(app)
      .post('/users')
      .send({ name: 'Old Name', email: 'old@example.com' });

    const id = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/users/${id}`)
      .send({ name: 'New Name', email: 'new@example.com' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe('New Name');
    expect(updateResponse.body.email).toBe('new@example.com');
  });

  it('should delete user by id', async () => {
    const createResponse = await request(app)
      .post('/users')
      .send({ name: 'To Delete', email: 'delete@example.com' });

    const id = createResponse.body.id;

    const deleteResponse = await request(app).delete(`/users/${id}`);
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get(`/users/${id}`);
    expect(getResponse.status).toBe(404);
  });

  it('should return 404 when updating non-existent user', async () => {
    const response = await request(app)
      .put('/users/non-existent-id')
      .send({ name: 'New Name' });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });

  it('should return 400 when updating email to one that already exists', async () => {
    await request(app)
      .post('/users')
      .send({ name: 'User1', email: 'user1@example.com' });

    const user2 = await request(app)
      .post('/users')
      .send({ name: 'User2', email: 'user2@example.com' });

    const response = await request(app)
      .put(`/users/${user2.body.id}`)
      .send({ email: 'user1@example.com' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Email already in use');
  });

  it('should return 404 when deleting a non-existent user', async () => {
    const response = await request(app).delete('/users/non-existent-id');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });
});
