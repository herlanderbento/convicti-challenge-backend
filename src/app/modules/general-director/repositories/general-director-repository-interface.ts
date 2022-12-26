import { CreateGeneralDirectorDtos } from '../dtos/create-general-director.dtos';
import { GeneralDirector } from '../infra/typeorm/entities/general-director';

export interface GeneralDirectorRepositoryInterface {
  create(data: CreateGeneralDirectorDtos): Promise<GeneralDirector>;
  findByUserId(user_id: string): Promise<GeneralDirector>;
}
