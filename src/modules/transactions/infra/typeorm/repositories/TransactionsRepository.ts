import { getRepository, Repository } from 'typeorm';

import {
  IBalanceProps,
  ITransactionsRepository,
} from '@modules/transactions/interfaces/repositories/ITransactionsRepository';
import { ICreateTransactionsDTO } from '@modules/transactions/dtos/ICreateTransactionsDTO';
import { Transaction } from '../entities/Transaction';

class TransactionsRepository implements ITransactionsRepository {
  // Variable that receives all transaction contract methods
  private transactionsRepository: Repository<Transaction>;

  constructor() {
    this.transactionsRepository = getRepository(Transaction);
  }

  /**
   * Implemented transaction contract methods
   */
  public async findById(id: string): Promise<Transaction | undefined> {
    const transaction = await this.transactionsRepository.findOne(id);

    return transaction;
  }

  public async getBalance(user_id: string): Promise<IBalanceProps> {
    const transactions = await this.transactionsRepository.find({ user_id });

    const summary = transactions.reduce(
      (accumulator, transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.total += transaction.value;
            break;
          case 'outcome':
            accumulator.total -= transaction.value;
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        total: 0,
      },
    );

    return summary;
  }

  public async create({
    title,
    value,
    type,
    balance,
    user_id,
  }: ICreateTransactionsDTO): Promise<Transaction> {
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
      balance,
      user_id,
    });

    await this.transactionsRepository.save(transaction);

    return transaction;
  }

  public async index(user_id: string): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      relations: ['user'],
      where: { user_id },
    });
  }
}

export { TransactionsRepository };
