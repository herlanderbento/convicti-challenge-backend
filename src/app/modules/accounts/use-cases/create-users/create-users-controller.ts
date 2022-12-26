import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUsersUseCases } from './create-users-use-cases';

export class CreateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUsersUseCases = container.resolve(CreateUsersUseCases);

    const userInfo = await createUsersUseCases.execute({ email, password });

    delete userInfo.password;

    return response.status(200).json(userInfo);
  }
}
