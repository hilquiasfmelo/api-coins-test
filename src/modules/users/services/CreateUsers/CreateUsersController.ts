import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import { CreateUsersService } from './CreateUsersService';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cep, city } = request.body;

    const createUsersService = container.resolve(CreateUsersService);

    const newUser = await createUsersService.execute({
      name,
      email,
      password,
      cep,
      city,
    });

    return response.status(201).json(instanceToInstance(newUser));
  }
}

export { CreateUserController };
