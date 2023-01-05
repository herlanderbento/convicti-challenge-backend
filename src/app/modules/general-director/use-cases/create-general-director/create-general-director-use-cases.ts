import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '@app/modules/accounts/infra/typeorm/repositories/users-repositories';
import { createSchemaValidate } from '@app/modules/general-director/validation';
import { AppError } from '@shared/errors/AppError';
import { CreateGeneralDirectorDtos } from '../../dtos/create-general-director.dtos';
import { GeneralDirector } from '../../infra/typeorm/entities/general-director';
import { GeneralDirectorRepository } from '../../infra/typeorm/repositories/general-director-repository';
import { hash } from 'bcrypt';

@injectable()
export class CreateGeneralDirectorUseCases {
  constructor(
    @inject('GeneralDirectorRepository')
    private generalDirectorRepository: GeneralDirectorRepository,
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateGeneralDirectorDtos): Promise<GeneralDirector> {
    if (!(await createSchemaValidate.isValid({ name, email, password }))) {
      throw new AppError('Validation fails');
    }

    const generalDirectorExists = await this.usersRepository.findByEmail(email);

    if (generalDirectorExists) {
      throw new AppError('General already exists!');
    }

    const passwordHash = await hash(password, 8);

    return await this.generalDirectorRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}
