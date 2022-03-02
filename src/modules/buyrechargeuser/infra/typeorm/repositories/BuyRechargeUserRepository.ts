import { Repository, getRepository, RelationId } from 'typeorm';

import { ICreateBuyRechargeUserDTO } from '@modules/buyrechargeuser/dtos/ICreateBuyRechargeUserDTO';
import { IBuyRechargeUserRepository } from '@modules/buyrechargeuser/interfaces/repositories/IBuyRechargeUserRepository';

import { BuyRechargeUser } from '../entities/BuyRechargeUser';

class BuyRechargeUserRepository implements IBuyRechargeUserRepository {
  private buyRechargeUserRepository: Repository<BuyRechargeUser>;

  constructor() {
    this.buyRechargeUserRepository = getRepository(BuyRechargeUser);
  }

  public async create({
    telephone,
    password,
    user_id,
    rechargephone_id,
  }: ICreateBuyRechargeUserDTO): Promise<BuyRechargeUser> {
    const buyRecharge = this.buyRechargeUserRepository.create({
      telephone,
      password,
      user_id,
      rechargephone_id,
    });

    await this.buyRechargeUserRepository.save(buyRecharge);

    return buyRecharge;
  }

  public async index(user_id: string): Promise<BuyRechargeUser[]> {
    return this.buyRechargeUserRepository.find({
      relations: ['rechargephone'],
      where: { user_id },
    });
  }
}

export { BuyRechargeUserRepository };
