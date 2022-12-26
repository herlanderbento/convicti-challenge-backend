import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { Users } from '../../infra/typeorm/entities/users';
import { UsersRepositoryInterface } from '../../repositories/users-repositories-interface';
import { usersInputSchemaValidate } from '../../validation';

@injectable()
export class CreateUsersUseCases {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface
  ) {}

  async execute({ email, password }): Promise<Users> {
    if (!(await usersInputSchemaValidate.isValid({ email, password }))) {
      throw new AppError('Validation fails');
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError('User already exists.');

    const passwordHash = await hash(password, 8);

    return await this.usersRepository.create({
      email,
      password: passwordHash,
    });
  }
}
