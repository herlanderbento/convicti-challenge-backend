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
    await this.generalDirectorRepository.create({
      name,
      email,
      password,
    });
  }
}
