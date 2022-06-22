import BlankLayout from '@app/components/layouts/BlankLayout/BlackLayout';
import Navbar from '@app/components/layouts/Navbar/Navbar';
import { AuthPathsEnum } from '@app/features/auth/constants/auth.paths';
import { RouteItemDef } from '@app/types/routes.types';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SettingsScreen from '../screens/SettingsScreenUser/SettingsScreenUser';

const LOGIN_SCREEN: RouteItemDef = {
  id: 'login',
  path: AuthPathsEnum.LOGIN,
  component: LoginScreen,
  navigationTitle: 'auth.loginTitle',
  layout: BlankLayout
};
const SETTING_SCREEN: RouteItemDef = {
  id: 'setting-user',
  path: AuthPathsEnum.SETTING,
  component: SettingsScreen,
  navigationTitle: 'auth.setttingTitle',
  layout: Navbar
};

export const AUTH_ROUTES = [LOGIN_SCREEN, SETTING_SCREEN];
