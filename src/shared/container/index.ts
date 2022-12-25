import { GeneralDirectorRepository } from '@app/modules/general-director/infra/typeorm/repositories/general-director-repository';
import { GeneralDirectorRepositoryInterface } from '@app/modules/general-director/repositories/general-director-repository-interface';
import { container } from 'tsyringe';

container.registerSingleton<GeneralDirectorRepositoryInterface>(
  'GeneralDirectorRepository',
  GeneralDirectorRepository
);
