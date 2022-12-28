import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSalespersonUseCases } from './create-salesperson-use-cases';

export class CreateSalespersonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { unit_id, name, email, password } = request.body;

    const createSalespersonUseCases = container.resolve(
      CreateSalespersonUseCases
    );

    await createSalespersonUseCases.execute({
      unit_id,
      name,
      email,
      password,
    });

    return response.json({ message: 'Salesperson created successful.' });
  }
}
