import { GeneralDirectorRepository } from '@app/modules/general-director/infra/typeorm/repositories/general-director-repository';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export async function ensureGeneralDirector(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const generalDirectorRepository = new GeneralDirectorRepository();

  const generalDirector = await generalDirectorRepository.findByUserId(id);

  if (!generalDirector) {
    throw new AppError("User isn't general director!");
  }

  return next();
}
