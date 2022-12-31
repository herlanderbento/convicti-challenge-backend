import { inject, injectable } from 'tsyringe';
import { UsersRepositoryInterface } from '@app/modules/accounts/repositories/users-repositories-interface';
import { AppError } from '@shared/errors/AppError';
import { CreateDirectorateDtos } from '../../dtos/create-directorate-dtos';
import { Directorate } from '../../infra/typeorm/entities/directorate';
import { DirectorateRepositoryInterface } from '../../repositories/directorate-repositories-interface';
import { directorateInputSchemaValidate } from '../../validation';

@injectable()
export class CreateDirectorateUseCases {
  constructor(
    @inject('DirectorateRepository')
    private directorateRepository: DirectorateRepositoryInterface,
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface
  ) {}

  async execute({
    name,
    directorate_name,
    email,
    roles,
    password,
  }: CreateDirectorateDtos): Promise<Directorate> {
    if (
      !(await directorateInputSchemaValidate.isValid({
        name,
        directorate_name,
        email,
        roles,
        password,
      }))
    ) {
      throw new AppError('Validation fails');
    }

    const usersAlreadyExists = await this.usersRepository.findByEmail(email);

    if (usersAlreadyExists) {
      throw new AppError('User already exists!');
    }

    return await this.directorateRepository.create({
      name,
      directorate_name,
      roles,
      email,
      password,
    });
  }
}
