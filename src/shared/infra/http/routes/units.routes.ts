import { CreateUnitController } from '@app/modules/units/use-cases/create-unit/create-unit-controller';
import { Router } from 'express';

const unitsRoutes = Router();

const createUnitController = new CreateUnitController();

unitsRoutes.post('/', createUnitController.handle);

export { unitsRoutes };
