import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateGeneralDirectorUseCases } from './authenticate-general-director-use-cases';

export class AuthenticateGeneralDirectorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateGeneralDirectorUseCases = container.resolve(
      AuthenticateGeneralDirectorUseCases
    );

    const authenticateInfo = await authenticateGeneralDirectorUseCases.execute({
      email,
      password,
    });

    return response.json(authenticateInfo);
  }
}
