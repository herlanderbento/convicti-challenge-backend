import { CreateSalesController } from '@app/modules/sales/use-cases/create-sales/create-sales-controller';
import { GetSalesController } from '@app/modules/sales/use-cases/get-sales/get-sales-controller';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

import { Router } from 'express';

const salesRoutes = Router();

const createSalesController = new CreateSalesController();
const getSalesController = new GetSalesController();

salesRoutes.post('/', ensureAuthenticated, createSalesController.handle);
salesRoutes.get('/', ensureAuthenticated, getSalesController.handle);

export { salesRoutes };
