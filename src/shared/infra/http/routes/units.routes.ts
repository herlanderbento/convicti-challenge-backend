import { CreateUnitController } from '@app/modules/units/use-cases/create-unit/create-unit-controller';
import { GetUnitsController } from '@app/modules/units/use-cases/get-units/get-units-controller';
import { Router } from 'express';

const unitsRoutes = Router();

const createUnitController = new CreateUnitController();
const getUnitsController = new GetUnitsController();

unitsRoutes.post('/', createUnitController.handle);
unitsRoutes.get('/', getUnitsController.handle);

export { unitsRoutes };
