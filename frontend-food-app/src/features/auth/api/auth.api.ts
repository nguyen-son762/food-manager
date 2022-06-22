import { AxiosResponse } from 'axios';

import { api } from '@app/api/api';

import { AuthEndpointsEnum } from '../constants/auth.endpoints';
import { LoginRequestDef } from '../types/auth.types';

export const authLogin = (data: LoginRequestDef): Promise<AxiosResponse> =>
  api.post(AuthEndpointsEnum.LOGIN, data);

export const authRegister = (data: LoginRequestDef): Promise<AxiosResponse> =>
  api.post(AuthEndpointsEnum.REGISTER, data);

export const autoLogin = (): Promise<AxiosResponse> =>
  api.get(AuthEndpointsEnum.AUTO_LOGIN);

export const updateUser = (data: any): Promise<AxiosResponse> => {
  return api.put(AuthEndpointsEnum.UPDATE, data, {
    headers: { 'content-type': 'multipart/form-data' }
  });
};

export const getAdmin = (): Promise<AxiosResponse> => {
  return api.get(AuthEndpointsEnum.GET_ADMIN);
};
