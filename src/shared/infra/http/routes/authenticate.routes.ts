import { AuthenticateUserController } from '@app/modules/accounts/use-cases/authenticate-users/authenticate-user-controller';
import { AuthenticateGeneralDirectorController } from '@app/modules/general-director/use-cases/authenticate-general-director/authenticate-general-director-controller';
import { Router } from 'express';

const authenticateRoutes = Router();
const authenticateGeneralDirectorController =
  new AuthenticateGeneralDirectorController();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post(
  '/general-director',
  authenticateGeneralDirectorController.handle
);

authenticateRoutes.post('/', authenticateUserController.handle);

export { authenticateRoutes };
