import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/interfaces/repositories/IUsersRepository';

import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  // Variable that receives all user contract methods
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  /**
   * Implemented user contract methods
   */
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }

  public async create({
    name,
    email,
    password,
    cep,
    street,
    number,
    district,
    city,
    state,
  }: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({
      name,
      email,
      password,
      cep,
      street,
      number,
      district,
      city,
      state,
    });

    await this.usersRepository.save(user);

    return user;
  }

  public async index(): Promise<User[]> {
    const users = await this.usersRepository.find();

    return users;
  }

  public async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}

export { UsersRepository };
