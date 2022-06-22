import { OrderRequestDef, OrderUpdateDef } from './../types/order.type';
import { api } from '@app/api/api';
import { OrderEndpointsEnum } from '../constants/order.endpoints';

export const createOrder = (data: OrderRequestDef) =>
  api.post(OrderEndpointsEnum.CREATE_ORDER, data);

export const getOrdersByUser = (page = 1) =>
  api.get(OrderEndpointsEnum.GET_ORDER_BY_USER, {
    params: {
      page
    }
  });

export const updateOrder = (data: OrderUpdateDef) => {
  return api.put(OrderEndpointsEnum.UPDATE_ORDER, data);
};

export const deleteOrders = (data: string[]) => {
  return api.post(OrderEndpointsEnum.DELETE_ORDER, {
    id_orders: data
  });
};

export const getOrdersByAdmin = (page = 1) =>
  api.get(OrderEndpointsEnum.GET_ORDERS_BY_ADMIN, {
    params: {
      page
    }
  });
