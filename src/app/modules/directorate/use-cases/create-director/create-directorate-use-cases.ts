import { UsersRepositoryInterface } from '@app/modules/accounts/repositories/users-repositories-interface';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
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
    user_id,
    roles,
  }: CreateDirectorateDtos): Promise<Directorate> {
    if (
      !(await directorateInputSchemaValidate.isValid({
        name,
        directorate_name,
        user_id,
        roles,
      }))
    ) {
      throw new AppError('Validation fails');
    }

    const directorAlreadyExists = await this.directorateRepository.findByUserId(
      user_id
    );

    if (directorAlreadyExists) throw new AppError('Director already exists.');

    const userId = await this.usersRepository.findById(user_id);

    if (!userId) {
      throw new AppError('User not found!');
    }

    return await this.directorateRepository.create({
      name,
      directorate_name,
      user_id,
      roles,
    });
  }
}
