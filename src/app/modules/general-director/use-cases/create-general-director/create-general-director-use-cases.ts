import { createSchemaValidate } from '@app/modules/general-director/validation';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { CreateGeneralDirectorDtos } from '../../dtos/create-general-director.dtos';
import { GeneralDirector } from '../../infra/typeorm/entities/general-director';
import { GeneralDirectorRepositoryInterface } from '../../repositories/general-director-repository-interface';

@injectable()
export class CreateGeneralDirectorUseCases {
  constructor(
    @inject('GeneralDirectorRepository')
    private generalDirectorRepository: GeneralDirectorRepositoryInterface
  ) {}

  async execute({
    user_id,
    name,
  }: CreateGeneralDirectorDtos): Promise<GeneralDirector> {
    if (!(await createSchemaValidate.isValid({ name, user_id }))) {
      throw new AppError('Validation fails');
    }

    const generalDirectorExists =
      await this.generalDirectorRepository.findByUserId(user_id);

    if (generalDirectorExists) {
      throw new AppError('General already exists!');
    }

    return await this.generalDirectorRepository.create({
      name,
      user_id,
    });
  }
}
