import { Users } from '@app/modules/accounts/infra/typeorm/entities/users';
import { CreateDirectorateDtos } from '@app/modules/directorate/dtos/create-directorate-dtos';
import { DirectorateRepositoryInterface } from '@app/modules/directorate/repositories/directorate-repositories-interface';
import { connection } from '@shared/infra/typeorm/typeorm.config';
import { Repository } from 'typeorm';
import { Directorate } from '../entities/directorate';

export class DirectorateRepository implements DirectorateRepositoryInterface {
  private repository: Repository<Directorate>;
  private userRepository: Repository<Users>;

  constructor() {
    this.repository = connection.getRepository(Directorate);
    this.userRepository = connection.getRepository(Users);
  }

  async create({
    name,
    directorate_name,
    roles,
    email,
    password,
  }: CreateDirectorateDtos): Promise<Directorate> {
    const createUser = this.userRepository.create({
      email,
      password,
    });

    const getUser = await this.userRepository.save(createUser);

    const create = this.repository.create({
      name,
      directorate_name,
      user_id: getUser.id,
      roles,
    });

    return await this.repository.save(create);
  }

  async findById(id: string): Promise<Directorate> {
    return await this.repository.findOneBy({ id });
  }

  async findByUserId(user_id: string): Promise<Directorate> {
    return await this.repository.findOneBy({ user_id });
  }

  async find(): Promise<Directorate[]> {
    const directorateQuery = this.repository
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.users', 'tb_users')
      .leftJoinAndSelect('u.units', 'tb_units');

    return await directorateQuery.getMany();
  }
}
