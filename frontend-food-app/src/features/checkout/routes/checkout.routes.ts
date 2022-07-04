import DefaultLayout from '@app/components/layouts/DefaultLayout/DefaultLayout';
import { RouteItemDef } from '@app/types/routes.types';
import { CheckoutEndpointsEnum } from '../checkout';
import CheckoutScreen from '../screens/CheckoutScreen';

const CHECKOUT_SCREEN: RouteItemDef = {
  id: 'checkout',
  path: CheckoutEndpointsEnum.CHECKOUT,
  component: CheckoutScreen,
  navigationTitle: 'checkout.checkoutTitle',
  layout: DefaultLayout
};

export const CHECKOUT_ROUTES = [CHECKOUT_SCREEN];
