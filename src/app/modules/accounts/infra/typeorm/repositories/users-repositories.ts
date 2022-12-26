import { connection } from '@shared/infra/typeorm/typeorm.config';
import { Repository } from 'typeorm';
import { CreateUsersDtos } from '../../../dtos/create-users-dtos';
import { UsersRepositoryInterface } from '../../../repositories/users-repositories-interface';
import { Users } from '../entities/users';

export class UsersRepository implements UsersRepositoryInterface {
  private repository: Repository<Users>;

  constructor() {
    this.repository = connection.getRepository(Users);
  }

  async create({ email, password }: CreateUsersDtos): Promise<Users> {
    const create = this.repository.create({
      email,
      password,
    });

    return await this.repository.save(create);
  }

  async findByEmail(email: string): Promise<Users> {
    return await this.repository.findOneBy({ email });
  }

  async findById(id: string): Promise<Users> {
    return await this.repository.findOneBy({ id });
  }
}
