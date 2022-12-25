import { CreateGeneralDirectorController } from '@app/modules/general-director/use-cases/create-general-director/create-general-director-controller';
import { Router } from 'express';

const generalDirectionRouters = Router();

const createGeneralDirectorController = new CreateGeneralDirectorController();

generalDirectionRouters.post('/', createGeneralDirectorController.handle);

generalDirectionRouters.get('/', (request, response) => {
  response.json({ message: 'Hello world' });
});

export { generalDirectionRouters };
