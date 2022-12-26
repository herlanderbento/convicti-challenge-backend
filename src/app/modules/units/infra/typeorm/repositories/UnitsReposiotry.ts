import { CreateUnitDtos } from '@app/modules/units/dtos/create-unit-dtos';
import { UnitsRepositoryInterface } from '@app/modules/units/repositories/UnitsRepositoryInterface';
import { connection } from '@shared/infra/typeorm/typeorm.config';
import { Repository } from 'typeorm';
import { Units } from '../entities/units';

export class UnitsRepository implements UnitsRepositoryInterface {
  private repository: Repository<Units>;
  constructor() {
    this.repository = connection.getRepository(Units);
  }

  async create({
    directorate_id,
    name,
    latitude,
    longitude,
  }: CreateUnitDtos): Promise<Units> {
    const create = this.repository.create({
      directorate_id,
      name,
      latitude,
      longitude,
    });

    return await this.repository.save(create);
  }

  async findById(id: string): Promise<Units> {
    return await this.repository.findOneBy({ id });
  }

  async findByDirectorateId(directorate_id: string): Promise<Units> {
    return await this.repository.findOneBy({ directorate_id });
  }

  async find(): Promise<Units[]> {
    return await this.repository.find();
  }
}
