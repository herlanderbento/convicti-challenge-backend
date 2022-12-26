import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUnitUseCases } from './create-unit-use-cases';

export class CreateUnitController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { directorate_id, name, latitude, longitude } = request.body;

    const createUnitUseCases = container.resolve(CreateUnitUseCases);

    const unitInfo = await createUnitUseCases.execute({
      directorate_id,
      name,
      latitude,
      longitude,
    });

    return response.status(200).json(unitInfo);
  }
}
