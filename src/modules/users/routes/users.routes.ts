import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { AuthenticateUsersController } from '../services/AuthenticateUsers/AuthenticateUsersController';
import { CreateUserController } from '../services/CreateUsers/CreateUsersController';
import { DisableAndEnableUsersController } from '../services/DisableAndEnableUsers/DisableAndEnableUsersController';
import { ListAllUsersController } from '../services/ListAllUsers/ListAllUsersController';
import { UpdateUsersController } from '../services/UpdateUsers/UpdateUsersController';

const usersRoutes = Router();

usersRoutes.post('/', new CreateUserController().handle);
usersRoutes.post('/session', new AuthenticateUsersController().handle);

// All the routes below will need the auth token
usersRoutes.use(ensureAuthenticated);

usersRoutes.get('/', new ListAllUsersController().handle);
usersRoutes.put('/', new UpdateUsersController().handle);
usersRoutes.patch(
  '/disableorenable/:id',
  new DisableAndEnableUsersController().handle,
);

export { usersRoutes };
