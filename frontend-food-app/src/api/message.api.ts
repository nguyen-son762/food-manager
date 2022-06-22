import { api } from './api';

export const getMessagesByUSer = (id: string) => {
  return api.get(`/message/${id}`);
};
export const getMessagesByAdmin = (adminId: string) => {
  return api.get(`/message/admin/${adminId}`);
};
