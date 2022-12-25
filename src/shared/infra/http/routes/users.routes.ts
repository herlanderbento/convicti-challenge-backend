import { CreateUsersController } from '@app/modules/accounts/use-cases/create-director/create-users-controller';
import { Router } from 'express';

const usersRoutes = Router();

const createUsersController = new CreateUsersController();

usersRoutes.post('/', createUsersController.handle);

export { usersRoutes };
