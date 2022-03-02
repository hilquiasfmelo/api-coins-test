import { ICreateRechargePhoneDTO } from '@modules/rechargephone/dtos/ICreateRechargePhoneDTO';
import { RechargePhone } from '@modules/rechargephone/infra/typeorm/entities/RechargePhone';

interface IRechargePhoneRepository {
  findByOperator(operator: string): Promise<RechargePhone | undefined>;
  findById(id: string): Promise<RechargePhone | undefined>;
  findAllByOperator(name: string): Promise<RechargePhone[]>;

  create(data: ICreateRechargePhoneDTO): Promise<RechargePhone>;
}

export { IRechargePhoneRepository };
