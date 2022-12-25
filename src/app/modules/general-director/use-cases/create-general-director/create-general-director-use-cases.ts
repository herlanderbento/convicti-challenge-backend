import { createSchemaValidate } from '@app/modules/validation';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { CreateGeneralDirectorDtos } from '../../dtos/create-general-director.dtos';
import { GeneralDirectorRepositoryInterface } from '../../repositories/general-director-repository-interface';

@injectable()
export class CreateGeneralDirectorUseCases {
  constructor(
    @inject('GeneralDirectorRepository')
    private generalDirectorRepository: GeneralDirectorRepositoryInterface
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateGeneralDirectorDtos): Promise<void> {
    if (!(await createSchemaValidate.isValid({ name, email, password }))) {
      throw new AppError('Validation fails');
    }

    const generalDirectorExists =
      await this.generalDirectorRepository.findByEmail(email);

    if (generalDirectorExists) {
      throw new AppError('General already exists!');
    }

    const passwordHash = await hash(password, 8);

    await this.generalDirectorRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}
