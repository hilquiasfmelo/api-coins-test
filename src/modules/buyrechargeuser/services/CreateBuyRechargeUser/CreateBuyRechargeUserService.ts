import { inject, injectable } from 'tsyringe';

import { ICreateBuyRechargeUserDTO } from '@modules/buyrechargeuser/dtos/ICreateBuyRechargeUserDTO';
import { BuyRechargeUser } from '@modules/buyrechargeuser/infra/typeorm/entities/BuyRechargeUser';
import { IBuyRechargeUserRepository } from '@modules/buyrechargeuser/interfaces/repositories/IBuyRechargeUserRepository';
import { IUsersRepository } from '@modules/users/interfaces/repositories/IUsersRepository';
import { IRechargePhoneRepository } from '@modules/rechargephone/interfaces/repositories/IRechargePhoneRepository';
import { IHashProvider } from '@modules/users/providers/HashProvider/interfaces/IHashProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateBuyRechargeUserService {
  constructor(
    @inject('BuyRechargeUserRepository')
    private buyRechargeUserRepository: IBuyRechargeUserRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RechargePhoneRepository')
    private rechargePhoneRepository: IRechargePhoneRepository,
  ) {}

  async execute({
    telephone,
    password,
    user_id,
    rechargephone_id,
  }: ICreateBuyRechargeUserDTO): Promise<BuyRechargeUser> {
    const user = await this.usersRepository.findById(user_id);

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      String(user?.password),
    );

    if (!passwordMatch) {
      throw new AppError('Password incorrect, please try again.', 401);
    }

    const operator = await this.rechargePhoneRepository.findById(
      rechargephone_id,
    );

    if (!operator) {
      throw new AppError('This operator does not exist', 404);
    }

    const buyRechargeUser = await this.buyRechargeUserRepository.create({
      telephone,
      password,
      user_id,
      rechargephone_id,
    });

    return buyRechargeUser;
  }
}

export { CreateBuyRechargeUserService };
