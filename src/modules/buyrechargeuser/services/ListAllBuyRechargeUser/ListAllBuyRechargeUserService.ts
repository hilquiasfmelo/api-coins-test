import { inject, injectable } from 'tsyringe';

import { IBuyRechargeUserRepository } from '@modules/buyrechargeuser/interfaces/repositories/IBuyRechargeUserRepository';
import { BuyRechargeUser } from '@modules/buyrechargeuser/infra/typeorm/entities/BuyRechargeUser';

import { AppError } from '@shared/errors/AppError';

@injectable()
class ListAllBuyRechargeUserService {
  constructor(
    @inject('BuyRechargeUserRepository')
    private buyRechargeUserRepository: IBuyRechargeUserRepository,
  ) {}

  async execute(user_id: string): Promise<BuyRechargeUser[]> {
    const buyRechargesUsers = await this.buyRechargeUserRepository.index(
      user_id,
    );

    if (buyRechargesUsers.length === 0) {
      throw new AppError('There are no buy of recharge for this user', 404);
    }

    return buyRechargesUsers;
  }
}

export { ListAllBuyRechargeUserService };
