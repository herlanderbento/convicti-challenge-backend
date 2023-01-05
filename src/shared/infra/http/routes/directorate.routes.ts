import { Router } from 'express';
import { CreateDirectorateController } from '@app/modules/directorate/use-cases/create-director/create-directorate-controller';
import { GetAllDirectorsController } from '@app/modules/directorate/use-cases/get-all-directors/get-all-directors-controller';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import { ensureGeneralDirector } from '../middleware/ensureGeneralDirector';
import { GetDirectorController } from '@app/modules/directorate/use-cases/get-director/get-director-controller';

const directorateRouters = Router();

const createDirectorateController = new CreateDirectorateController();
const getAllDirectorsController = new GetAllDirectorsController();
const getDirectorController = new GetDirectorController();

directorateRouters.get(
  '/',
  ensureAuthenticated,
  ensureGeneralDirector,
  getAllDirectorsController.handle
);
directorateRouters.get('/:id', getDirectorController.handle);
directorateRouters.post('/', createDirectorateController.handle);

export { directorateRouters };
