import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetDirectorUseCases } from './get-director-use-cases';

export class GetDirectorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getDirectorUseCases = container.resolve(GetDirectorUseCases);

    const directorInfo = await getDirectorUseCases.execute(id);

    return response.json(directorInfo);
  }
}
