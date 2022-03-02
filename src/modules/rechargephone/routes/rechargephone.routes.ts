import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateRechargePhoneController } from '../services/CreateRechargePhone/CreateRechargePhoneController';
import { SearchOperatorController } from '../services/SearchOperator/SearchOperatorController';

const rechargephoneRoutes = Router();

// All the routes below will need the auth token
rechargephoneRoutes.use(ensureAuthenticated);

rechargephoneRoutes.post('/', new CreateRechargePhoneController().handle);
rechargephoneRoutes.get('/search', new SearchOperatorController().handle);

export { rechargephoneRoutes };
