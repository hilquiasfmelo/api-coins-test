import { Router } from 'express';

import { transactionsRoutes } from '@modules/transactions/routes/transactions.routes';
import { usersRoutes } from '@modules/users/routes/users.routes';
import { rechargephoneRoutes } from '@modules/rechargephone/routes/rechargephone.routes';
import { buyrechargeuserRoutes } from '@modules/buyrechargeuser/routes/buyrechargeuser.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/transactions', transactionsRoutes);
routes.use('/rechargephone', rechargephoneRoutes);
routes.use('/buyrechargeuser', buyrechargeuserRoutes);

export { routes };
