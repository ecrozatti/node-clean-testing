import express from 'express';
import bodyParser from 'body-parser';
import { UserController } from '../../src/interfaces/http/controllers/UserController';
import { InMemoryUserRepository } from '../../src/infrastructure/repositories/InMemoryUserRepository';
import { CreateUser } from '../../src/application/use-cases/CreateUser';
import { GetUserById } from '../../src/application/use-cases/GetUserById';
import { ListUsers } from '../../src/application/use-cases/ListUsers';
import { UpdateUser } from '../../src/application/use-cases/UpdateUser';
import { DeleteUser } from '../../src/application/use-cases/DeleteUser';
import { NotFoundError } from '../../src/shared/errors/NotFoundError';

export const createTestServer = () => {
  const app = express();
  app.use(bodyParser.json());

  const repository = new InMemoryUserRepository();
  const controller = new UserController(
    new CreateUser(repository),
    new GetUserById(repository),
    new ListUsers(repository),
    new UpdateUser(repository),
    new DeleteUser(repository),
  );

  app.post('/users', async (req, res) => {
    try {
      const user = await controller.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  app.get('/users', async (req, res) => {
    try {
      const users = await controller.getAll();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  app.get('/users/:id', async (req, res) => {
    try {
      const user = await controller.getById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  });

  app.put('/users/:id', async (req, res) => {
    try {
      const user = await controller.update({
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
      });
      res.json(user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const status = error.statusCode || 400;
      res.status(status).json({ error: (error as Error).message });
    }
  });

  app.delete('/users/:id', async (req, res) => {
    try {
      await controller.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  });

  return app;
};
