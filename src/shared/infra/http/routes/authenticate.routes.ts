import { AuthenticateGeneralDirectorController } from '@app/modules/general-director/use-cases/authenticate-general-director/authenticate-general-director-controller';
import { Router } from 'express';

const authenticateRoutes = Router();
const authenticateGeneralDirectorController =
  new AuthenticateGeneralDirectorController();

authenticateRoutes.post(
  '/general-director',
  authenticateGeneralDirectorController.handle
);

export { authenticateRoutes };
