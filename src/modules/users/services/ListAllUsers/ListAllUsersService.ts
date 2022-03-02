import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/interfaces/repositories/IUsersRepository';

import { AppError } from '@shared/errors/AppError';

@injectable()
class ListAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.index();

    if (users.length === 0) {
      throw new AppError('There are no registered users');
    }

    return users;
  }
}

export { ListAllUsersService };
