import { CreateSalesController } from '@app/modules/sales/use-cases/create-sales/create-sales-controller';
import { GetSalesController } from '@app/modules/sales/use-cases/get-sales/get-sales-controller';
import { Router } from 'express';

const salesRoutes = Router();

const createSalesController = new CreateSalesController();
const getSalesController = new GetSalesController();

salesRoutes.post('/', createSalesController.handle);
salesRoutes.get('/', getSalesController.handle);

export { salesRoutes };
