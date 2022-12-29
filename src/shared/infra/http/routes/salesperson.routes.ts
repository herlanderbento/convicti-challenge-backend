import { CreateSalespersonController } from '@app/modules/salesperson/use-cases/create-salesperson/create-salesperson-controller';
import { GetSalespersonController } from '@app/modules/salesperson/use-cases/get-salesperson/get-salesperson-controller';
import { Router } from 'express';

const salespersonRoutes = Router();

const createSalespersonController = new CreateSalespersonController();
const getSalespersonController = new GetSalespersonController();

salespersonRoutes.post('/', createSalespersonController.handle);
salespersonRoutes.get('/', getSalespersonController.handle);

export { salespersonRoutes };
