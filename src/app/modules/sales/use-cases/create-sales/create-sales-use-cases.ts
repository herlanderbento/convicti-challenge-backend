import { DirectorateRepository } from '@app/modules/directorate/infra/typeorm/repositories/directorate-repositories';
import { SalespersonRepository } from '@app/modules/salesperson/infra/typeorm/repositories/salesperson-repository';
import { UnitsRepository } from '@app/modules/units/infra/typeorm/repositories/UnitsReposiotry';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { CreateSalesDtos } from '../../dtos/create-sales-dts';
import { SalesRepository } from '../../infra/typeorm/repositories/sales-repository';
import { createSchemaValidate } from '../../validation';

@injectable()
export class CreateSalesUseCases {
  constructor(
    @inject('SalesRepository')
    private salesRepository: SalesRepository,
    @inject('UnitsRepository')
    private unitsRepository: UnitsRepository,
    @inject('DirectorateRepository')
    private directorateRepository: DirectorateRepository,
    @inject('SalespersonRepository')
    private salespersonRepository: SalespersonRepository
  ) {}

  async execute({
    unit_id,
    salesperson_id,
    directorate_id,
    amount,
    date_sale,
  }: CreateSalesDtos): Promise<void> {
    if (
      !(await createSchemaValidate.isValid({
        unit_id,
        salesperson_id,
        directorate_id,
        amount,
        date_sale,
      }))
    ) {
      throw new AppError('Validation fails');
    }

    const salesperson = this.salespersonRepository.findById(salesperson_id);

    if (!salesperson) {
      throw new AppError('Salesperson not found.');
    }

    const directorate = this.directorateRepository.findById(directorate_id);

    if (!directorate) {
      throw new AppError('Directorate not found.');
    }

    const units = this.unitsRepository.findById(unit_id);

    if (!units) {
      throw new AppError('Units not found.');
    }

    await this.salesRepository.create({
      unit_id,
      salesperson_id,
      directorate_id,
      amount,
      date_sale,
    });
  }
}
