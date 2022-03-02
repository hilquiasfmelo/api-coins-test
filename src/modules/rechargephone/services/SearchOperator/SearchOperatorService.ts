import { inject, injectable } from 'tsyringe';

import { IRechargePhoneRepository } from '@modules/rechargephone/interfaces/repositories/IRechargePhoneRepository';
import { RechargePhone } from '@modules/rechargephone/infra/typeorm/entities/RechargePhone';

import { AppError } from '@shared/errors/AppError';

@injectable()
class SearchOperatorService {
  constructor(
    @inject('RechargePhoneRepository')
    private rechargePhoneRepository: IRechargePhoneRepository,
  ) {}

  async execute(name: string): Promise<RechargePhone[]> {
    const operators = await this.rechargePhoneRepository.findAllByOperator(
      name,
    );

    if (operators.length === 0) {
      throw new AppError(
        'Looks like there are no good matches for your search',
        404,
      );
    }

    return operators;
  }
}

export { SearchOperatorService };
