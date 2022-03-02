import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllTransactionsService } from './ListAllTransactionsService';

class ListAllTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;

    const listAllTransactionsService = container.resolve(
      ListAllTransactionsService,
    );

    const transactions = await listAllTransactionsService.execute(user_id);

    return response.status(200).json(transactions);
  }
}

export { ListAllTransactionsController };
