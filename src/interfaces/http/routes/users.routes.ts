import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { InMemoryUserRepository } from '../../../infrastructure/repositories/InMemoryUserRepository';
import { CreateUser } from '../../../application/use-cases/CreateUser';
import { GetUserById } from '../../../application/use-cases/GetUserById';
import { ListUsers } from '../../../application/use-cases/ListUsers';
import { UpdateUser } from '../../../application/use-cases/UpdateUser';
import { DeleteUser } from '../../../application/use-cases/DeleteUser';

const router = Router();

const repository = new InMemoryUserRepository();

const createUserUseCase = new CreateUser(repository);
const getUserByIdUseCase = new GetUserById(repository);
const listUsersUseCase = new ListUsers(repository);
const updateUserUseCase = new UpdateUser(repository);
const deleteUserUseCase = new DeleteUser(repository);

const userController = new UserController(
  createUserUseCase,
  getUserByIdUseCase,
  listUsersUseCase,
  updateUserUseCase,
  deleteUserUseCase,
);

router.post('/', async (req: Request, res: Response) => {
  try {
    const user = await userController.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await userController.getById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userController.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const user = await userController.update({
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

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await userController.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

export { router as usersRouter };
