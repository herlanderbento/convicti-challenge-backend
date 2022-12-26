import { Router } from 'express';
import { CreateDirectorateController } from '@app/modules/directorate/use-cases/create-director/create-directorate-controller';
import { GetDirectorsController } from '@app/modules/directorate/use-cases/get-directors/get-directors-controller';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import { ensureGeneralDirector } from '../middleware/ensureGeneralDirector';

const directorateRouters = Router();

const createDirectorateController = new CreateDirectorateController();
const getDirectorsController = new GetDirectorsController();

directorateRouters.get(
  '/',
  ensureAuthenticated,
  ensureGeneralDirector,
  getDirectorsController.handle
);
directorateRouters.post('/', createDirectorateController.handle);

export { directorateRouters };
