import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import { ListAllUsersService } from './ListAllUsersService';

class ListAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllUsersService = container.resolve(ListAllUsersService);

    const users = await listAllUsersService.execute();

    return response.status(200).json(instanceToInstance(users));
  }
}

export { ListAllUsersController };
