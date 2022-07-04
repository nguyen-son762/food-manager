import DefaultLayout from '@app/components/layouts/DefaultLayout/DefaultLayout';
import { RouteItemDef } from '@app/types/routes.types';
import OrdersScreen from '../screens/Setting/Setting';

const SETTING_SCREEN: RouteItemDef = {
  id: 'setting_order',
  path: '/settings',
  component: OrdersScreen,
  navigationTitle: 'setting',
  layout: DefaultLayout
};

export const SETTING_ROUTES = [SETTING_SCREEN];
