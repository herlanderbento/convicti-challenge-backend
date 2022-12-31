import { inject, injectable } from 'tsyringe';
import { SalesRepository } from '../../infra/typeorm/repositories/sales-repository';

@injectable()
export class GetSalesUseCases {
  constructor(
    @inject('SalesRepository')
    private salesRepository: SalesRepository
  ) {}

  async execute() {
    return await this.salesRepository.find();
  }
}
