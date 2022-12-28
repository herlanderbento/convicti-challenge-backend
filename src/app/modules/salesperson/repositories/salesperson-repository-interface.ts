import { CreateSalespersonDtos } from '../dtos/create-salesperson-dtos';
import { Salesperson } from '../infra/typeorm/entities/salesperson';

export interface SalespersonRepositoryInterface {
  create(data: CreateSalespersonDtos): Promise<Salesperson>;
  findById(id: string): Promise<Salesperson>;
  findByUserId(user_id: string): Promise<Salesperson>;
  findByUnitId(unit_id: string): Promise<Salesperson>;
  find(): Promise<Salesperson[]>;
}
