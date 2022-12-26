import { CreateDirectorateDtos } from '../dtos/create-directorate-dtos';
import { Directorate } from '../infra/typeorm/entities/directorate';

export interface DirectorateRepositoryInterface {
  create(data: CreateDirectorateDtos): Promise<Directorate>;
  findByUserId(user_id: string): Promise<Directorate>;
  find(): Promise<Directorate[]>;
}
