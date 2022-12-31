import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetSalesUseCases } from './get-sales-use-cases';

export class GetSalesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getSalesUseCases = container.resolve(GetSalesUseCases);

    const getSalesInfo = await getSalesUseCases.execute();

    return response.json(getSalesInfo);
  }
}
