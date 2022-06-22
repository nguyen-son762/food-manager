import { UserDef } from './../../auth/types/auth.types';
import { FoodDef } from '../../food/types/food.type';

export type OrderDef = {
  food: FoodDef | null;
  amount: number;
  note?: string;
};

export type InitialStateDef = {
  _id: string;
  listOrder: OrderDef[];
  status: string;
  createAt: string;
  error: boolean;
  address: string;
  phonenumber: number;
  fullname?: string;
  user_id: string;
};

export enum enumOrder {
  PREPARING = 'Preparing',
  ORDERED = 'Ordered',
  COMPLETED = 'Completed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled'
}

export type OrderDetailDef = {
  _id: string;
  createdAt: string;
  foods: OrderDef[];
  status: enumOrder;
  user: UserDef;
  isChecked?: boolean;
  fullname?: string;
};

export type OrderUpdateDef = {
  _id: string;
  status: string;
  listFood: OrderUpdateFoodsDef[];
};
export type OrderUpdateFoodsDef = {
  food: string;
  amount?: number;
  note?: string;
};

export type OrderRequestDef = {
  listFood: OrderDef[];
  address: string;
  phonenumber: number;
  user_id: string;
  fullname?: string;
};
