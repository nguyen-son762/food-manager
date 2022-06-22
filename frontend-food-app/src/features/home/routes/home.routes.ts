import Navbar from '@app/components/layouts/Navbar/Navbar';
import { RouteItemDef } from '@app/types/routes.types';
import Home from '../screens/Home/Home';

const HOME_SCREEN: RouteItemDef = {
  id: 'home',
  path: '/home',
  component: Home,
  navigationTitle: 'home',
  layout: Navbar
};

export const HOME_ROUTES = [HOME_SCREEN];
