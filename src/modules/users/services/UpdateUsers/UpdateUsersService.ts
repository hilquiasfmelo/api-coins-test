import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/interfaces/repositories/IUsersRepository';
import { IHashProvider } from '@modules/users/providers/HashProvider/interfaces/IHashProvider';

import { api } from '@shared/service/api';
import { IResponseAPIProps } from '@shared/service/interface/IResponseAPIProps';
import { AppError } from '@shared/errors/AppError';

interface IRequestProps {
  id: string;
  name: string;
  email: string;
  password: string;
  cep: string;
  city: string;
}

@injectable()
class UpdateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    id,
    name,
    email,
    password,
    cep,
    city,
  }: IRequestProps): Promise<User> {
    // Fetching and destructuring api data
    const { data } = await api.get<IResponseAPIProps>(`${cep}/json`);

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('You cannot update a user that does not exist.', 404);
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    // Checks if the email you are trying to change is currently connected
    if (userWithUpdatedEmail && userWithUpdatedEmail.id === id) {
      throw new AppError('E-mail already in use.');
    }

    if (userWithUpdatedEmail) {
      throw new AppError('This email is already registered');
    }

    if (city && city !== data.localidade) {
      throw new AppError('Please enter the city name correctly.');
    }

    if (data.complemento === '') {
      data.complemento = 'S/N';
    }

    user.password = await this.hashProvider.generateHash(password);

    Object.assign(user, {
      name,
      email,
      password: user.password,
      cep,
      street: data.logradouro,
      number: data.complemento,
      district: data.bairro,
      city,
      state: data.uf,
    });

    const updateUser = await this.usersRepository.save(user);

    return updateUser;
  }
}

export { UpdateUsersService };
