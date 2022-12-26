import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { directorateRouters } from './directorate.routes';
import { generalDirectionRouters } from './general-director.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/directorate', directorateRouters);
router.use('/general-director', generalDirectionRouters);
router.use('/session', authenticateRoutes);
router.use('/users', usersRoutes);

export { router };
