import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/interfaces/repositories/IUsersRepository';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IHashProvider } from '@modules/users/providers/HashProvider/interfaces/IHashProvider';

import { api } from '@shared/service/api';
import { IResponseAPIProps } from '@shared/service/interface/IResponseAPIProps';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    email,
    password,
    cep,
    city,
    active,
  }: ICreateUserDTO): Promise<User> {
    // Fetching and destructuring api data
    const { data } = await api.get<IResponseAPIProps>(`${cep}/json`);

    // Checks if there is already a registered user by email
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppError('There is already a registered user with this email.');
    }

    // Checks if the city entered matches the one coming from the API
    if (city !== data.localidade) {
      throw new AppError('Please enter the city name correctly.', 400);
    }

    if (data.complemento === '') {
      data.complemento = 'S/N';
    }

    // Encrypts the password entered by the user
    const passwordHash = await this.hashProvider.generateHash(password);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      cep,
      street: data.logradouro,
      number: data.complemento,
      district: data.bairro,
      city,
      state: data.uf,
      active,
    });

    return newUser;
  }
}

export { CreateUsersService };
