import { FoodResponse } from '@app/features/food/food';
import { AxiosResponse } from 'axios';
import { api, apiForm } from '@app/api/api';
import { FoodndpointsEnum } from '../constants/food.endpoints';

export const getListFood = (): Promise<AxiosResponse<FoodResponse>> =>
  api.get<FoodResponse>(FoodndpointsEnum.GET_LIST_FOOD);

export const getFoodByPaginationAndCategoryType = (
  page: number,
  type: string,
  keyword = ''
): Promise<AxiosResponse<FoodResponse>> => {
  if (!type) {
    type = 'Hot dishes';
  }
  return api.get<FoodResponse>(FoodndpointsEnum.GET_LIST_FOOD, {
    params: {
      page,
      type,
      limit: 6,
      keyword
    }
  });
};

export const addFood = (data: any) => {
  return apiForm.post(FoodndpointsEnum.CREATE_FOOD, data);
};

export const updateFood = (id: string, data: any) => {
  return apiForm.put(`${FoodndpointsEnum.UPDATE_FOOD}/${id}`, data);
};

export const deleteFood = (ids: string[]) => {
  return api.delete(`${FoodndpointsEnum.DELETE_FOOD}`, {
    data: { ids }
  });
};
