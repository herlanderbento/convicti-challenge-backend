import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetSalespersonUseCases } from './get-salesperson-use-cases';

export class GetSalespersonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getSalespersonUseCases = container.resolve(GetSalespersonUseCases);

    const getAllSalesperson = await getSalespersonUseCases.execute();

    return response.json(getAllSalesperson);
  }
}
