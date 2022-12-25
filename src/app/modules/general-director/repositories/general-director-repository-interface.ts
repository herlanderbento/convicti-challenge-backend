import { CreateGeneralDirectorDtos } from '../dtos/create-general-director.dtos';

export interface GeneralDirectorRepositoryInterface {
  create(data: CreateGeneralDirectorDtos): Promise<void>;
}
