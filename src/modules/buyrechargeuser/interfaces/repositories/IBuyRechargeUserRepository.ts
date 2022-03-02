import { ICreateBuyRechargeUserDTO } from '@modules/buyrechargeuser/dtos/ICreateBuyRechargeUserDTO';
import { BuyRechargeUser } from '@modules/buyrechargeuser/infra/typeorm/entities/BuyRechargeUser';

interface IBuyRechargeUserRepository {
  create(data: ICreateBuyRechargeUserDTO): Promise<BuyRechargeUser>;
  index(user_id: string): Promise<BuyRechargeUser[]>;
}

export { IBuyRechargeUserRepository };
