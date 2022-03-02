import { inject, injectable } from 'tsyringe';

import { ICreateTransactionsDTO } from '@modules/transactions/dtos/ICreateTransactionsDTO';
import { Transaction } from '@modules/transactions/infra/typeorm/entities/Transaction';
import { ITransactionsRepository } from '@modules/transactions/interfaces/repositories/ITransactionsRepository';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/users/interfaces/repositories/IUsersRepository';

@injectable()
class CreateTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    title,
    value,
    type,
    user_id,
  }: ICreateTransactionsDTO): Promise<Transaction> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Could not continue, user does not exist.', 404);
    }

    // Search the balance of the logged in user
    const { total } = await this.transactionsRepository.getBalance(user_id);

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance.');
    }

    let result;

    if (type === 'outcome') {
      result = total - value;
    } else if (type === 'income') {
      result = total + value;
    }

    const transaction = await this.transactionsRepository.create({
      title,
      value,
      type,
      balance: result,
      user_id,
    });

    return transaction;
  }
}
export { CreateTransactionsService };
