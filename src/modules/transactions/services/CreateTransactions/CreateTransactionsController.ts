import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTransactionsService } from './CreateTransactionsService';

class CreateTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, value, type } = request.body;
    const { user_id } = request.user;

    const createTransactionsService = container.resolve(
      CreateTransactionsService,
    );

    const transaction = await createTransactionsService.execute({
      title,
      value,
      type,
      user_id,
    });

    return response.status(201).json(transaction);
  }
}

export { CreateTransactionsController };
