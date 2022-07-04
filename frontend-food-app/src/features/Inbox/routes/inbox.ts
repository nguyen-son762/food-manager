import DefaultLayout from '@app/components/layouts/DefaultLayout/DefaultLayout';
import { RouteItemDef } from '@app/types/routes.types';
import ChatScreen from '../screens/InboxScreen';

const INBOX_SCREEN: RouteItemDef = {
  id: 'setting_order',
  path: '/inbox',
  component: ChatScreen,
  navigationTitle: 'chat',
  layout: DefaultLayout
};

export const INBOX_ROUTES = [INBOX_SCREEN];
