interface ICreateTransactionsDTO {
  id?: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  balance?: number;
  user_id: string;
}

export { ICreateTransactionsDTO };
