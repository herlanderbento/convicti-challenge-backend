import auth from '@app/config/auth';
import { authenticateSchemaValidate } from '@app/modules/validation';
import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { GeneralDirectorRepository } from '../../infra/typeorm/repositories/general-director-repository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateGeneralDirectorUseCases {
  constructor(
    @inject('GeneralDirectorRepository')
    private generalDirectorRepository: GeneralDirectorRepository
  ) {}

  async execute({ email, password }: IRequest) {
    if (!(await authenticateSchemaValidate.isValid({ email, password }))) {
      throw new AppError('Validation fails');
    }

    const generalDirector = await this.generalDirectorRepository.findByEmail(
      email
    );

    if (!generalDirector) {
      throw new AppError('Email or password incorrect!', 401);
    }

    const passwordMatch = await compare(password, generalDirector.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!', 401);
    }

    const { expires_in_token, secret_token } = auth;

    const token = sign({}, secret_token, {
      subject: generalDirector.id,
      expiresIn: expires_in_token,
    });

    return {
      token,
      generalDirector: {
        name: generalDirector.name,
        email: generalDirector.email,
      },
    };
  }
}
