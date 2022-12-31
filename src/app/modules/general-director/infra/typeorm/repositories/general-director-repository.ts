import { Repository } from 'typeorm';
import { CreateGeneralDirectorDtos } from '@app/modules/general-director/dtos/create-general-director.dtos';
import { GeneralDirectorRepositoryInterface } from '@app/modules/general-director/repositories/general-director-repository-interface';
import { GeneralDirector } from '@app/modules/general-director/infra/typeorm/entities/general-director';
import { connection } from '@shared/infra/typeorm/typeorm.config';
import { Users } from '@app/modules/accounts/infra/typeorm/entities/users';

export class GeneralDirectorRepository
  implements GeneralDirectorRepositoryInterface
{
  private repository: Repository<GeneralDirector>;
  private userRepository: Repository<Users>;

  constructor() {
    this.repository = connection.getRepository(GeneralDirector);
    this.userRepository = connection.getRepository(Users);
  }

  async create({
    name,
    email,
    password,
  }: CreateGeneralDirectorDtos): Promise<GeneralDirector> {
    const createUser = this.userRepository.create({
      email,
      password,
    });

    const getUser = await this.userRepository.save(createUser);

    const create = this.repository.create({
      name,
      user_id: getUser.id,
    });

    return await this.repository.save(create);
  }

  async findByUserId(user_id: string): Promise<GeneralDirector> {
    return await this.repository.findOneBy({ user_id });
  }
}
