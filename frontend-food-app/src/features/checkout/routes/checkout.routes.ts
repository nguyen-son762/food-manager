import Navbar from '@app/components/layouts/Navbar/Navbar';
import { RouteItemDef } from '@app/types/routes.types';
import { CheckoutEndpointsEnum } from '../checkout';
import CheckoutScreen from '../screens/CheckoutScreen';

const CHECKOUT_SCREEN: RouteItemDef = {
  id: 'checkout',
  path: CheckoutEndpointsEnum.CHECKOUT,
  component: CheckoutScreen,
  navigationTitle: 'checkout.checkoutTitle',
  layout: Navbar
};

export const CHECKOUT_ROUTES = [CHECKOUT_SCREEN];
