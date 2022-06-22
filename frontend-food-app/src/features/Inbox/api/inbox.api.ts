import { api } from '@app/api/api';

export const getRooms = (idAdmin: string) => {
  return api.get(`/message/rooms/${idAdmin}`);
};
