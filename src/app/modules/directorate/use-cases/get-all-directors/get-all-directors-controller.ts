import { classToPlain } from 'class-transformer';
import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { GetAllDirectorsUseCases } from './get-all-directors-use-cases';

export class GetAllDirectorsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getDirectorsUseCases = container.resolve(GetAllDirectorsUseCases);

    const directorateInfo = await getDirectorsUseCases.execute();

    return response.json(classToPlain(directorateInfo));
  }
}
