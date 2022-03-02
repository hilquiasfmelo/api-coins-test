import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DisableAndEnableUsersService } from './DisableAndEnableUsersService';

class DisableAndEnableUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const disableAndEnableUsersService = container.resolve(
      DisableAndEnableUsersService,
    );

    await disableAndEnableUsersService.execute(id);

    return response.status(204).send();
  }
}

export { DisableAndEnableUsersController };
