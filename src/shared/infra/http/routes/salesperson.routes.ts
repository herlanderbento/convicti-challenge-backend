import { CreateSalespersonController } from '@app/modules/salesperson/use-cases/create-salesperson/create-salesperson-controller';
import { Router } from 'express';

const salespersonRoutes = Router();

const createSalespersonController = new CreateSalespersonController();

salespersonRoutes.post('/', createSalespersonController.handle);

export { salespersonRoutes };
