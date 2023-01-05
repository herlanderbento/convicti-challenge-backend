import { CreateUnitController } from '@app/modules/units/use-cases/create-unit/create-unit-controller';
import { GetUnitsController } from '@app/modules/units/use-cases/get-units/get-units-controller';
import { Router } from 'express';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const unitsRoutes = Router();

const createUnitController = new CreateUnitController();
const getUnitsController = new GetUnitsController();

unitsRoutes.post('/', ensureAuthenticated, createUnitController.handle);
unitsRoutes.get('/', ensureAuthenticated, getUnitsController.handle);

export { unitsRoutes };
