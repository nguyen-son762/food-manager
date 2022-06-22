import Navbar from '@app/components/layouts/Navbar/Navbar';
import { RouteItemDef } from '@app/types/routes.types';
import OrdersScreen from '../screens/Setting/Setting';

const SETTING_SCREEN: RouteItemDef = {
  id: 'setting_order',
  path: '/settings',
  component: OrdersScreen,
  navigationTitle: 'setting',
  layout: Navbar
};

export const SETTING_ROUTES = [SETTING_SCREEN];
