import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { UpdateUsersService } from './UpdateUsersService';

class UpdateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;
    const { name, email, password, cep, city } = request.body;

    const updateUsersService = container.resolve(UpdateUsersService);

    const updateUser = await updateUsersService.execute({
      id: user_id,
      name,
      email,
      password,
      cep,
      city,
    });

    return response.status(200).json(instanceToInstance(updateUser));
  }
}

export { UpdateUsersController };
