import { CreateSalesDtos } from '../dtos/create-sales-dts';
import { Sales } from '../infra/typeorm/entities/sales';

export interface SalesRepositoryInterface {
  create(data: CreateSalesDtos): Promise<void>;
  find(): Promise<Sales[]>;
}
