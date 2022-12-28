import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { directorateRouters } from './directorate.routes';
import { generalDirectionRouters } from './general-director.routes';
import { salespersonRoutes } from './salesperson.routes';
import { unitsRoutes } from './units.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/directorate', directorateRouters);
router.use('/general-director', generalDirectionRouters);
router.use('/session', authenticateRoutes);
router.use('/users', usersRoutes);
router.use('/units', unitsRoutes);
router.use('/salesperson', salespersonRoutes);

export { router };
