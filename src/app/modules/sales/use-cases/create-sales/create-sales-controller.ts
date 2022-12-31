import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSalesUseCases } from './create-sales-use-cases';

export class CreateSalesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { body: data } = request;

    const createSalesUseCases = container.resolve(CreateSalesUseCases);

    await createSalesUseCases.execute(data);

    return response.json({ message: 'Create sales successfully' });
  }
}
