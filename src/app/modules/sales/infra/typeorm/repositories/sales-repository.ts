import { CreateSalesDtos } from '@app/modules/sales/dtos/create-sales-dts';
import { SalesRepositoryInterface } from '@app/modules/sales/repositories/sales-repository-interface';
import { connection } from '@shared/infra/typeorm/typeorm.config';
import { Repository } from 'typeorm';
import { Sales } from '../entities/sales';

export class SalesRepository implements SalesRepositoryInterface {
  private repository: Repository<Sales>;
  constructor() {
    this.repository = connection.getRepository(Sales);
  }

  async create({
    unit_id,
    salesperson_id,
    directorate_id,
    amount,
    date_sale,
  }: CreateSalesDtos): Promise<void> {
    const create = this.repository.create({
      unit_id,
      salesperson_id,
      directorate_id,
      amount,
      total_amount: amount,
      date_sale,
    });

    await this.repository.save(create);
  }

  async find(): Promise<Sales[]> {
    return await this.repository.find({
      select: {
        salesperson: {
          name: true,
        },
        directorate: {
          directorate_name: true,
        },
        units: {
          name: true,
        },
      },
      relations: {
        salesperson: true,
        directorate: true,
        units: true,
      },
    });
  }
}
