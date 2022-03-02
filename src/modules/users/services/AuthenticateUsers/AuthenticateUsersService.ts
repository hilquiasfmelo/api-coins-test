import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { IUsersRepository } from '@modules/users/interfaces/repositories/IUsersRepository';
import { IHashProvider } from '@modules/users/providers/HashProvider/interfaces/IHashProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequestProps {
  email: string;
  password: string;
}

interface IResponseProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ email, password }: IRequestProps): Promise<IResponseProps> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Username or password incorrect', 401);
    }

    // Checks if the password that the user passed matches the one encrypted in the bank
    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('Username or password incorrect', 401);
    }

    if (user.active === false) {
      throw new AppError('This user is disabled, try another one.', 401);
    }

    // Authentication token generation
    const token = sign({}, String(process.env.JWT_SECRET), {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthenticateUsersService };
