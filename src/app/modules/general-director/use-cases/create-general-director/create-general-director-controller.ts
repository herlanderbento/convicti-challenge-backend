import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateGeneralDirectorUseCases } from './create-general-director-use-cases';

export class CreateGeneralDirectorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, name } = request.body;

    const createGeneralDirectorUseCases = container.resolve(
      CreateGeneralDirectorUseCases
    );

    const generalDirectorInfo = await createGeneralDirectorUseCases.execute({
      user_id,
      name,
    });

    return response.status(200).json(generalDirectorInfo);
  }
}
