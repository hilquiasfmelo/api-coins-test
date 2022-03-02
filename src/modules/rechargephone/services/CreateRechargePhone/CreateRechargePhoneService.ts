import { inject, injectable } from 'tsyringe';

import { ICreateRechargePhoneDTO } from '@modules/rechargephone/dtos/ICreateRechargePhoneDTO';
import { IRechargePhoneRepository } from '@modules/rechargephone/interfaces/repositories/IRechargePhoneRepository';

import { RechargePhone } from '@modules/rechargephone/infra/typeorm/entities/RechargePhone';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateRechargePhoneService {
  constructor(
    @inject('RechargePhoneRepository')
    private rechargePhoneRepository: IRechargePhoneRepository,
  ) {}

  async execute({
    operator,
    value,
    howtouse,
  }: ICreateRechargePhoneDTO): Promise<RechargePhone> {
    const operatorExist = await this.rechargePhoneRepository.findByOperator(
      operator,
    );

    /**
     * If the operator exists and the value inside it is the same entered,
     * the system will give an error, otherwise the same operator will be registered,
     * but with a new value
     */
    if (operatorExist && operatorExist.value === value) {
      throw new AppError(
        'You cannot register a operator that already exists with this value.',
      );
    }

    const rechargephone = await this.rechargePhoneRepository.create({
      operator,
      value,
      howtouse,
    });

    return rechargephone;
  }
}

export { CreateRechargePhoneService };
