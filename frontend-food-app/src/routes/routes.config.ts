import { AUTH_ROUTES } from '@app/features/auth/auth';
import { INBOX_ROUTES } from '@app/features/Inbox/inbox';
import { CHECKOUT_ROUTES } from '@app/features/checkout/checkout';
import { HOME_ROUTES } from '@app/features/home/home';
import { ORDER_ROUTES } from '@app/features/orders/routes/order.routes';
import { SETTING_ROUTES } from '@app/features/settings/settings';
import { DASHBOARD_ROUTES } from '@app/features/dashboard';

export const PUBLIC_LIST = [...AUTH_ROUTES, ...HOME_ROUTES, ...CHECKOUT_ROUTES];
export const PRIVATE_LIST = [
  ...SETTING_ROUTES,
  ...ORDER_ROUTES,
  ...INBOX_ROUTES,
  ...DASHBOARD_ROUTES
];
