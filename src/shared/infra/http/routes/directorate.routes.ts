import { CreateDirectorateController } from '@app/modules/directorate/use-cases/create-director/create-directorate-controller';
import { Router } from 'express';

const directorateRouters = Router();

const createDirectorateController = new CreateDirectorateController();

directorateRouters.post('/', createDirectorateController.handle);

export { directorateRouters };
