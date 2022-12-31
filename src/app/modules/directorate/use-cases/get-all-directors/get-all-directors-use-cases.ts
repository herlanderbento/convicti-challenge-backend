import { inject, injectable } from 'tsyringe';
import { Directorate } from '../../infra/typeorm/entities/directorate';
import { DirectorateRepositoryInterface } from '../../repositories/directorate-repositories-interface';

@injectable()
export class GetAllDirectorsUseCases {
  constructor(
    @inject('DirectorateRepository')
    private directorateRepository: DirectorateRepositoryInterface
  ) {}

  async execute(): Promise<Directorate[]> {
    return await this.directorateRepository.find();
  }
}
