import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRechargePhoneService } from './CreateRechargePhoneService';

class CreateRechargePhoneController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { operator, value, howtouse } = request.body;

    const createRechargePhoneService = container.resolve(
      CreateRechargePhoneService,
    );

    const rechargePhone = await createRechargePhoneService.execute({
      operator,
      value,
      howtouse,
    });

    return response.status(201).json(rechargePhone);
  }
}

export { CreateRechargePhoneController };
