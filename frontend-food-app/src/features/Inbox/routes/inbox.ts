import Navbar from '@app/components/layouts/Navbar/Navbar';
import { RouteItemDef } from '@app/types/routes.types';
import ChatScreen from '../screens/InboxScreen';

const INBOX_SCREEN: RouteItemDef = {
  id: 'setting_order',
  path: '/inbox',
  component: ChatScreen,
  navigationTitle: 'chat',
  layout: Navbar
};

export const INBOX_ROUTES = [INBOX_SCREEN];
