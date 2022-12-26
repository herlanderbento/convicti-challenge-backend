import { CreateUnitDtos } from '../dtos/create-unit-dtos';
import { Units } from '../infra/typeorm/entities/units';

export interface UnitsRepositoryInterface {
  create(data: CreateUnitDtos): Promise<Units>;
  findById(id: string): Promise<Units>;
  findByDirectorateId(directorate_id: string): Promise<Units>;
  find(): Promise<Units[]>;
}
