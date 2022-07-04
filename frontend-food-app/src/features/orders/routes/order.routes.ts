import DefaultLayout from '@app/components/layouts/DefaultLayout/DefaultLayout';
import { RouteItemDef } from '@app/types/routes.types';
import Orders from '../screens/Orders/Orders';

const ORDER_SCREEN: RouteItemDef = {
  id: 'order',
  path: '/order',
  component: Orders,
  navigationTitle: 'order',
  layout: DefaultLayout
};

export const ORDER_ROUTES = [ORDER_SCREEN];
