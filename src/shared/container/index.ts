import { container } from 'tsyringe';

// User providers connection to the application
import '@modules/users/providers';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/interfaces/repositories/IUsersRepository';
import { ITransactionsRepository } from '@modules/transactions/interfaces/repositories/ITransactionsRepository';
import { TransactionsRepository } from '@modules/transactions/infra/typeorm/repositories/TransactionsRepository';
import { IRechargePhoneRepository } from '@modules/rechargephone/interfaces/repositories/IRechargePhoneRepository';
import { RechargePhoneRepository } from '@modules/rechargephone/infra/typeorm/repositories/RechargePhoneRepository';
import { IBuyRechargeUserRepository } from '@modules/buyrechargeuser/interfaces/repositories/IBuyRechargeUserRepository';
import { BuyRechargeUserRepository } from '@modules/buyrechargeuser/infra/typeorm/repositories/BuyRechargeUserRepository';

/**
 * Entity Dependency Injection
 */
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);

container.registerSingleton<IRechargePhoneRepository>(
  'RechargePhoneRepository',
  RechargePhoneRepository,
);

container.registerSingleton<IBuyRechargeUserRepository>(
  'BuyRechargeUserRepository',
  BuyRechargeUserRepository,
);
