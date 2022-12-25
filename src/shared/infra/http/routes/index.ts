import { Router } from 'express';
import { generalDirectionRouters } from './general-director.routes';

const router = Router();

router.use('/general-director', generalDirectionRouters);

export { router };
