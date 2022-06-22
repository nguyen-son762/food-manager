import { RoleDef } from '@app/types/role.type';

export type TokenDef = {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  tokenType?: string;
};

export type ApiResponseDef = {
  token: string;
  expiresIn?: string;
};

export type LoginRequestDef = {
  username: string;
  password: string;
};

export type RegisterRequestDef = {
  username: string;
  password: string;
  email: string;
  address: string;
  phonenumber: number;
  first_name: string;
  last_name: string;
};

export type UserDef = {
  _id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  avatar_url?: string;
  email?: string;
  address: string;
  phonenumber: number;
  role?: RoleDef;
};

export interface InitialStateDef {
  user: UserDef | null;
  isAuthenticated: boolean;
  error: boolean;
  loading: boolean;
}

export type UserResponseDef = {
  jwt: string;
  user: {
    _id: string;
    username: string;
    email: string;
    first_name: string;
    avatar_url?: string;
    last_name: string;
    phonenumber: number;
    adress: string;
    role: RoleDef;
  };
};
