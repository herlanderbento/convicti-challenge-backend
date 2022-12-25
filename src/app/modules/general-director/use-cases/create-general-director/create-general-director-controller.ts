import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateGeneralDirectorUseCases } from './create-general-director-use-cases';

export class CreateGeneralDirectorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createGeneralDirectorUseCases = container.resolve(
      CreateGeneralDirectorUseCases
    );

    await createGeneralDirectorUseCases.execute({
      name,
      email,
      password,
    });

    return response.status(200).json({ message: 'Created' });
  }
}
