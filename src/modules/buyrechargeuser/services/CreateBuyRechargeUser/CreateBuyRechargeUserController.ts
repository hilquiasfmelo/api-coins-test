import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import { CreateBuyRechargeUserService } from './CreateBuyRechargeUserService';

class CreateBuyRechargeUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;
    const { telephone, password, rechargephone_id } = request.body;

    const createBuyRechargeUserService = container.resolve(
      CreateBuyRechargeUserService,
    );

    const buyRechargeUser = await createBuyRechargeUserService.execute({
      telephone,
      password,
      user_id,
      rechargephone_id,
    });

    return response.status(201).json(instanceToInstance(buyRechargeUser));
  }
}

export { CreateBuyRechargeUserController };
