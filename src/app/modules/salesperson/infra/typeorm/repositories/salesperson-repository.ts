import { Users } from '@app/modules/accounts/infra/typeorm/entities/users';
import { CreateSalespersonDtos } from '@app/modules/salesperson/dtos/create-salesperson-dtos';
import { SalespersonRepositoryInterface } from '@app/modules/salesperson/repositories/salesperson-repository-interface';
import { connection } from '@shared/infra/typeorm/typeorm.config';
import { Repository } from 'typeorm';
import { Salesperson } from '../entities/salesperson';

export class SalespersonRepository implements SalespersonRepositoryInterface {
  private repository: Repository<Salesperson>;
  private userRepository: Repository<Users>;

  constructor() {
    this.repository = connection.getRepository(Salesperson);
    this.userRepository = connection.getRepository(Users);
  }

  async create({
    unit_id,
    name,
    email,
    password,
  }: CreateSalespersonDtos): Promise<Salesperson> {
    const createUser = this.userRepository.create({
      email,
      password,
    });

    const user = await this.userRepository.save(createUser);

    const create = this.repository.create({
      user_id: user.id,
      unit_id,
      name,
    });

    return await this.repository.save(create);
  }

  async findById(id: string): Promise<Salesperson> {
    return await this.repository.findOneBy({ id });
  }

  async findByUserId(user_id: string): Promise<Salesperson> {
    return await this.repository.findOneBy({ user_id });
  }

  async findByUnitId(unit_id: string): Promise<Salesperson> {
    return await this.repository.findOneBy({ unit_id });
  }

  async func() {}

  async find(): Promise<Salesperson[]> {
    return await this.repository.find({
      select: {
        users: {
          id: false,
          email: true,
        },
        units: {
          name: true,
        },
      },
      relations: {
        users: true,
        units: true,
      },
    });
  }
}
