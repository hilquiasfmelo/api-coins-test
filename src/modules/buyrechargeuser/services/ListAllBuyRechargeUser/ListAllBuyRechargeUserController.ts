import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllBuyRechargeUserService } from './ListAllBuyRechargeUserService';

class ListAllBuyRechargeUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;

    const listAllTransactionsService = container.resolve(
      ListAllBuyRechargeUserService,
    );

    const buyRechargesUsers = await listAllTransactionsService.execute(user_id);

    return response.status(200).json(buyRechargesUsers);
  }
}

export { ListAllBuyRechargeUserController };
