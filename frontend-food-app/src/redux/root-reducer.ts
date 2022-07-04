import { CATEGORY_FEATURE_KEY } from './../features/category/constants/category.key';
import { combineReducers } from '@reduxjs/toolkit';

import { authReducer, AUTH_FEATURE_KEY } from '@app/features/auth/auth';
import { orderReducer, ORDER_FEATURE_KEY } from '@app/features/orders/orders';
import { categoryReducer } from '@app/features/category/redux/category.slice';

const rootReducer = combineReducers({
  [AUTH_FEATURE_KEY]: authReducer,
  [ORDER_FEATURE_KEY]: orderReducer,
  [CATEGORY_FEATURE_KEY]: categoryReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
