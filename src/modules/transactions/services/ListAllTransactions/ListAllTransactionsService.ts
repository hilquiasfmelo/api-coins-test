import { Transaction } from '@modules/transactions/infra/typeorm/entities/Transaction';
import { ITransactionsRepository } from '@modules/transactions/interfaces/repositories/ITransactionsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListAllTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute(user_id: string): Promise<Transaction[]> {
    const transations = await this.transactionsRepository.index(user_id);

    if (transations.length === 0) {
      throw new AppError('There are no transactions for this user', 404);
    }

    return transations;
  }
}

export { ListAllTransactionsService };
