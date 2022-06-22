export type FoodDef = {
  _id: string;
  name: string;
  price: number;
  url_img: string;
  avaiable: number;
  category?: string;
  isChecked?: boolean;
};
export type FoodResponse = {
  data: FoodDef[];
  limit: number;
  page: number;
  totalPage: number;
};
export type FoodRequest = {
  category_id: string;
  name: string;
  price: number;
  file: any;
};
