import { CreateDirectorateDtos } from '@app/modules/directorate/dtos/create-directorate-dtos';
import { DirectorateRepositoryInterface } from '@app/modules/directorate/repositories/directorate-repositories-interface';
import { connection } from '@shared/infra/typeorm/typeorm.config';
import { Repository } from 'typeorm';
import { Directorate } from '../entities/directorate';

export class DirectorateRepository implements DirectorateRepositoryInterface {
  private repository: Repository<Directorate>;

  constructor() {
    this.repository = connection.getRepository(Directorate);
  }

  async create({
    name,
    directorate_name,
    user_id,
  }: CreateDirectorateDtos): Promise<Directorate> {
    const create = this.repository.create({ name, directorate_name, user_id });

    return await this.repository.save(create);
  }

  async findById(id: string): Promise<Directorate> {
    return await this.repository.findOneBy({ id });
  }

  async findByUserId(user_id: string): Promise<Directorate> {
    return await this.repository.findOneBy({ user_id });
  }
}
