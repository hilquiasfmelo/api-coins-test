import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

// User repository agreement template below
interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;

  create(data: ICreateUserDTO): Promise<User>;
  index(): Promise<User[]>;
  save(user: User): Promise<User>;
}

export { IUsersRepository };
