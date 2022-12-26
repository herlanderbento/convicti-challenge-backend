import auth from '@app/config/auth';
import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { UsersRepositoryInterface } from '../../repositories/users-repositories-interface';
import { usersInputSchemaValidate } from '../../validation';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCases {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface
  ) {}

  async execute({ email, password }: IRequest) {
    if (!(await usersInputSchemaValidate.isValid({ email, password }))) {
      throw new AppError('Validations fails');
    }

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect!', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!', 401);
    }

    const { expires_in_token, secret_token } = auth;

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    return {
      token,
      user: {
        email: user.email,
      },
    };
  }
}
