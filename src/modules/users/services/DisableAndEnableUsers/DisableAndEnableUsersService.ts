import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/interfaces/repositories/IUsersRepository';

import { AppError } from '@shared/errors/AppError';

@injectable()
class DisableAndEnableUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError(
        'You cannot deactivate a user that does not exist.',
        404,
      );
    }

    // Makes the state change from active to deactivated
    user.active = !user.active;

    await this.usersRepository.save(user);
  }
}

export { DisableAndEnableUsersService };
