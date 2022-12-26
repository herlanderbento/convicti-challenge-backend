import auth from '@app/config/auth';
import { UsersRepository } from '@app/modules/accounts/infra/typeorm/repositories/users-repositories';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { secret_token } = auth;

  const authHeaders = request.headers.authorization;

  if (!authHeaders) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeaders.split(' ');

  try {
    const { sub: user_id } = verify(token, secret_token) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    request.user = {
      id: user_id,
    };
    next();
  } catch (err) {
    throw new AppError('Invalid token!', 401);
  }
}
