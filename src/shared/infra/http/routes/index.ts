import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { generalDirectionRouters } from './general-director.routes';

const router = Router();

router.use('/general-director', generalDirectionRouters);
router.use('/session', authenticateRoutes);

export { router };
