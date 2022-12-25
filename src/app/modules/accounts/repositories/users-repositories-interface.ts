import { CreateUsersDtos } from '../dtos/create-users-dtos';
import { Users } from '../infra/typeorm/entities/users';

export interface UsersRepositoryInterface {
  create(data: CreateUsersDtos): Promise<void>;
  findByEmail(email: string): Promise<Users>;
}
