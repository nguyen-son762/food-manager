import { AUTH_ROLE } from './auth.constants';

export const NAVBAR_ITEMS = [
  {
    name: 'Home',
    path: '/home',
    icon: 'home',
    role: [AUTH_ROLE.USER, AUTH_ROLE.ADMIN]
  },
  {
    name: 'order',
    path: '/order',
    icon: 'bookmark_added',
    role: [AUTH_ROLE.USER]
  },
  {
    name: 'settings',
    path: '/settings',
    icon: 'settings',
    role: [AUTH_ROLE.ADMIN]
  },
  {
    name: 'inbox',
    path: '/inbox',
    icon: 'chat',
    role: [AUTH_ROLE.ADMIN]
  }
];
