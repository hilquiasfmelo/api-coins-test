import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateTransactionsController } from '../services/CreateTransactions/CreateTransactionsController';
import { ListAllTransactionsController } from '../services/ListAllTransactions/ListAllTransactionsController';

const transactionsRoutes = Router();

// All the routes below will need the auth token
transactionsRoutes.use(ensureAuthenticated);

transactionsRoutes.post('/', new CreateTransactionsController().handle);
transactionsRoutes.get('/', new ListAllTransactionsController().handle);

export { transactionsRoutes };
