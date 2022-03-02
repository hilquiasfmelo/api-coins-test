import { getRepository, ILike, Repository } from 'typeorm';

import { ICreateRechargePhoneDTO } from '@modules/rechargephone/dtos/ICreateRechargePhoneDTO';
import { IRechargePhoneRepository } from '@modules/rechargephone/interfaces/repositories/IRechargePhoneRepository';

import { RechargePhone } from '../entities/RechargePhone';

class RechargePhoneRepository implements IRechargePhoneRepository {
  private rechargephoneRepository: Repository<RechargePhone>;

  constructor() {
    this.rechargephoneRepository = getRepository(RechargePhone);
  }

  public async findById(id: string): Promise<RechargePhone | undefined> {
    const rechargephone = await this.rechargephoneRepository.findOne(id);

    return rechargephone;
  }

  public async findByOperator(
    operator: string,
  ): Promise<RechargePhone | undefined> {
    return this.rechargephoneRepository.findOne({ operator });
  }

  public async findAllByOperator(name: string): Promise<RechargePhone[]> {
    return this.rechargephoneRepository.find({
      operator: ILike(`%${name}%`),
    });
  }

  public async create({
    operator,
    value,
    howtouse,
  }: ICreateRechargePhoneDTO): Promise<RechargePhone> {
    const rechargephone = this.rechargephoneRepository.create({
      operator,
      value,
      howtouse,
    });

    await this.rechargephoneRepository.save(rechargephone);

    return rechargephone;
  }
}

export { RechargePhoneRepository };
