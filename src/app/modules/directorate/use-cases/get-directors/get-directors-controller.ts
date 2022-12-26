import { classToPlain } from 'class-transformer';
import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { GetDirectorsUseCases } from './get-directors-use-cases';

export class GetDirectorsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getDirectorsUseCases = container.resolve(GetDirectorsUseCases);

    const directorateInfo = await getDirectorsUseCases.execute();

    return response.json(classToPlain(directorateInfo));
  }
}
