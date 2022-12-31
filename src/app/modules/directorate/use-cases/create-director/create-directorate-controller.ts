import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateDirectorateUseCases } from './create-directorate-use-cases';

export class CreateDirectorateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, directorate_name, roles, email, password } = request.body;

    const createDirectorateUseCases = container.resolve(
      CreateDirectorateUseCases
    );

    const directorateInfo = await createDirectorateUseCases.execute({
      name,
      directorate_name,
      roles,
      email,
      password,
    });

    return response.status(200).json(directorateInfo);
  }
}
