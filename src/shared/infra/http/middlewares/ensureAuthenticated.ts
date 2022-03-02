import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

interface IPayloadProps {
  sub: string;
}

const ensureAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  // Checks if token exists in request header
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // Perform token separation from word Bearer
  const [, token] = authHeader.split(' ');

  try {
    // Get userid extracted from JWT
    const { sub: user_id } = verify(
      token,
      String(process.env.JWT_SECRET),
    ) as IPayloadProps;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist.', 401);
    }

    // Makes user ID available in Request global of the Application
    request.user = {
      user_id,
    };

    next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
};

export { ensureAuthenticated };
