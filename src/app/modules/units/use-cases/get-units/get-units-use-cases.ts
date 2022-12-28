import { inject, injectable } from 'tsyringe';
import { UnitsRepositoryInterface } from '../../repositories/UnitsRepositoryInterface';

@injectable()
export class GetUnitsUseCases {
  constructor(
    @inject('UnitsRepository')
    private unitsRepository: UnitsRepositoryInterface
  ) {}

  async execute() {
    return await this.unitsRepository.find();
  }
}
