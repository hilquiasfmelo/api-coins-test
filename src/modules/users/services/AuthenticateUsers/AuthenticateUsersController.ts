import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUsersService } from './AuthenticateUsersService';

class AuthenticateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUsersService);

    const token = await authenticateUserService.execute({
      email,
      password,
    });

    return response.status(200).json(token);
  }
}

export { AuthenticateUsersController };
