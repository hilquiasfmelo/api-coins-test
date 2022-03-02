import { ICreateTransactionsDTO } from '@modules/transactions/dtos/ICreateTransactionsDTO';
import { Transaction } from '@modules/transactions/infra/typeorm/entities/Transaction';

export interface IBalanceProps {
  total: number;
}

// User repository agreement template below
interface ITransactionsRepository {
  findById(id: string): Promise<Transaction | undefined>;
  getBalance(user_id: string): Promise<IBalanceProps>;

  create(data: ICreateTransactionsDTO): Promise<Transaction>;
  index(user_id: string): Promise<Transaction[]>;
}

export { ITransactionsRepository };
