import Navbar from '@app/components/layouts/Navbar/Navbar';
import { RouteItemDef } from '@app/types/routes.types';
import Orders from '../screens/Orders/Orders';

const ORDER_SCREEN: RouteItemDef = {
  id: 'order',
  path: '/order',
  component: Orders,
  navigationTitle: 'order',
  layout: Navbar
};

export const ORDER_ROUTES = [ORDER_SCREEN];
