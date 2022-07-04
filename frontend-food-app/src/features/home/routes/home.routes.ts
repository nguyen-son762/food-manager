import DefaultLayout from '@app/components/layouts/DefaultLayout/DefaultLayout';
import { RouteItemDef } from '@app/types/routes.types';
import Home from '../screens/Home/Home';

const HOME_SCREEN: RouteItemDef = {
  id: 'home',
  path: '/home',
  component: Home,
  navigationTitle: 'home',
  layout: DefaultLayout
};

export const HOME_ROUTES = [HOME_SCREEN];
