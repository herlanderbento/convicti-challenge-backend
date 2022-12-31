import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { directorateRouters } from './directorate.routes';
import { generalDirectionRouters } from './general-director.routes';
import { salesRoutes } from './sales.routes';
import { salespersonRoutes } from './salesperson.routes';
import { unitsRoutes } from './units.routes';

const router = Router();

router.use('/directorate', directorateRouters);
router.use('/general-director', generalDirectionRouters);
router.use('/session', authenticateRoutes);
router.use('/units', unitsRoutes);
router.use('/salesperson', salespersonRoutes);
router.use('/sales', salesRoutes);

export { router };
