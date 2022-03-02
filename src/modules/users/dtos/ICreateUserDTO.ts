interface ICreateUserDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
  cep: string;
  street?: string;
  number?: string;
  district?: string;
  city: string;
  state?: string;
  active?: boolean;
}

export { ICreateUserDTO };
