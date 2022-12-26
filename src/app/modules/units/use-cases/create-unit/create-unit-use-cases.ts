import { DirectorateRepositoryInterface } from '@app/modules/directorate/repositories/directorate-repositories-interface';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { CreateUnitDtos } from '../../dtos/create-unit-dtos';
import { Units } from '../../infra/typeorm/entities/units';
import { UnitsRepositoryInterface } from '../../repositories/UnitsRepositoryInterface';
import { createSchemaValidate } from '../../validation';

@injectable()
export class CreateUnitUseCases {
  constructor(
    @inject('UnitsRepository')
    private unitsRepository: UnitsRepositoryInterface,
    @inject('DirectorateRepository')
    private directorateRepository: DirectorateRepositoryInterface
  ) {}

  async execute({
    directorate_id,
    name,
    latitude,
    longitude,
  }: CreateUnitDtos): Promise<Units> {
    if (
      !(await createSchemaValidate.isValid({
        directorate_id,
        name,
        latitude,
        longitude,
      }))
    ) {
      throw new AppError('Validation fails');
    }

    const director = await this.directorateRepository.findById(directorate_id);

    if (!director) {
      throw new AppError('Director or manager not found!');
    }

    const managerAlreadyExists = await this.unitsRepository.findByDirectorateId(
      directorate_id
    );

    if (managerAlreadyExists) {
      throw new AppError('Manager already exist!');
    }

    return await this.unitsRepository.create({
      directorate_id,
      name,
      latitude,
      longitude,
    });
  }
}
