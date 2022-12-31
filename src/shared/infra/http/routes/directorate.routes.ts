import { Router } from 'express';
import { CreateDirectorateController } from '@app/modules/directorate/use-cases/create-director/create-directorate-controller';
import { GetAllDirectorsController } from '@app/modules/directorate/use-cases/get-all-directors/get-all-directors-controller';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import { ensureGeneralDirector } from '../middleware/ensureGeneralDirector';

const directorateRouters = Router();

const createDirectorateController = new CreateDirectorateController();
const getAllDirectorsController = new GetAllDirectorsController();

directorateRouters.get(
  '/',
  ensureAuthenticated,
  ensureGeneralDirector,
  getAllDirectorsController.handle
);
directorateRouters.post('/', createDirectorateController.handle);

export { directorateRouters };
