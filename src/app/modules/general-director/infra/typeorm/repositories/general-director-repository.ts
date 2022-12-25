import { Repository } from 'typeorm';
import { CreateGeneralDirectorDtos } from '@app/modules/general-director/dtos/create-general-director.dtos';
import { GeneralDirectorRepositoryInterface } from '@app/modules/general-director/repositories/general-director-repository-interface';
import { GeneralDirector } from '@app/modules/general-director/infra/typeorm/entities/general-director';
import { connection } from '@shared/infra/typeorm/typeorm.config';

export class GeneralDirectorRepository
  implements GeneralDirectorRepositoryInterface
{
  private repository: Repository<GeneralDirector>;

  constructor() {
    this.repository = connection.getRepository(GeneralDirector);
  }

  async create({
    name,
    email,
    password,
  }: CreateGeneralDirectorDtos): Promise<void> {
    const generalDirector = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(generalDirector);
  }

  async findByEmail(email: string): Promise<GeneralDirector> {
    return await this.repository.findOneBy({ email });
  }
}
