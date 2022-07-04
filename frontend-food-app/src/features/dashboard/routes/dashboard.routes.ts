import DefaultLayout from '@app/components/layouts/DefaultLayout/DefaultLayout';
import { RouteItemDef } from '@app/types/routes.types';
import { DashboardEndpointsEnum } from '../constants/dashboard.endpoints';
import DashboardScreen from '../screens/DashboardScreen';

const LOGIN_SCREEN: RouteItemDef = {
  id: 'login',
  path: DashboardEndpointsEnum.DASHBOARD,
  component: DashboardScreen,
  navigationTitle: 'dashboard',
  layout: DefaultLayout
};
export const DASHBOARD_ROUTES = [LOGIN_SCREEN];
