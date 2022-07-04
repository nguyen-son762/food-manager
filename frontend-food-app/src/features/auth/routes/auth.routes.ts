import BlankLayout from '@app/components/layouts/BlankLayout/BlackLayout';
import DefaultLayout from '@app/components/layouts/DefaultLayout/DefaultLayout';
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
  layout: DefaultLayout
};

export const AUTH_ROUTES = [LOGIN_SCREEN, SETTING_SCREEN];
