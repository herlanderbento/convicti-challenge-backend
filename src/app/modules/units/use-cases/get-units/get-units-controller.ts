import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetUnitsUseCases } from './get-units-use-cases';

export class GetUnitsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getUnitsUseCases = container.resolve(GetUnitsUseCases);

    const unitsInfo = await getUnitsUseCases.execute();

    return response.json(unitsInfo);
  }
}
