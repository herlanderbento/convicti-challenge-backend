import { CreateUsersDtos } from '../dtos/create-users-dtos';
import { Users } from '../infra/typeorm/entities/users';

export interface UsersRepositoryInterface {
  create(data: CreateUsersDtos): Promise<Users>;
  findByEmail(email: string): Promise<Users>;
  findById(id: string): Promise<Users>;
}
