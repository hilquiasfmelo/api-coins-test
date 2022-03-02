import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateBuyRechargeUserController } from '../services/CreateBuyRechargeUser/CreateBuyRechargeUserController';
import { ListAllBuyRechargeUserController } from '../services/ListAllBuyRechargeUser/ListAllBuyRechargeUserController';

const buyrechargeuserRoutes = Router();

// All the routes below will need the auth token
buyrechargeuserRoutes.use(ensureAuthenticated);

buyrechargeuserRoutes.post('/', new CreateBuyRechargeUserController().handle);
buyrechargeuserRoutes.get('/', new ListAllBuyRechargeUserController().handle);

export { buyrechargeuserRoutes };
