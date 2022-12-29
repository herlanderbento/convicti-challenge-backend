import { inject, injectable } from 'tsyringe';
import { Salesperson } from '../../infra/typeorm/entities/salesperson';
import { SalespersonRepository } from '../../infra/typeorm/repositories/salesperson-repository';

@injectable()
export class GetSalespersonUseCases {
  constructor(
    @inject('SalespersonRepository')
    private salespersonRepository: SalespersonRepository
  ) {}

  async execute(): Promise<Salesperson[]> {
    return await this.salespersonRepository.find();
  }
}
