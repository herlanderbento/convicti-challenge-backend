import { UsersRepositoryInterface } from '@app/modules/accounts/repositories/users-repositories-interface';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { CreateSalespersonDtos } from '../../dtos/create-salesperson-dtos';
import { Salesperson } from '../../infra/typeorm/entities/salesperson';
import { SalespersonRepository } from '../../infra/typeorm/repositories/salesperson-repository';
import { createSchemaValidate } from '../../validation';

@injectable()
export class CreateSalespersonUseCases {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
    @inject('SalespersonRepository')
    private salespersonRepository: SalespersonRepository
  ) {}

  async execute({
    unit_id,
    name,
    email,
    password,
  }: CreateSalespersonDtos): Promise<Salesperson> {
    if (
      !(await createSchemaValidate.isValid({
        unit_id,
        name,
        email,
        password,
      }))
    ) {
      throw new AppError('Validation fails');
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exits');
    }

    const passwordHash = await hash(password, 8);

    return await this.salespersonRepository.create({
      unit_id,
      name,
      email,
      password: passwordHash,
    });
  }
}
