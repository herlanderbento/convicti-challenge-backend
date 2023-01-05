import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Directorate } from '../../infra/typeorm/entities/directorate';
import { DirectorateRepositoryInterface } from '../../repositories/directorate-repositories-interface';

@injectable()
export class GetDirectorUseCases {
  constructor(
    @inject('DirectorateRepository')
    private directorateRepository: DirectorateRepositoryInterface
  ) {}

  async execute(id: string): Promise<Directorate> {
    const directorate = await this.directorateRepository.findById(id);

    if (!directorate) {
      throw new AppError('Director not found');
    }
    return await this.directorateRepository.findByIdShowDetails(id);
  }
}
