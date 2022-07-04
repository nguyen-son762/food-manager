import { ComponentType, ReactNode } from 'react';

export type RouteGroupDef = {
  id: string;
  groupTitle: string;
  /** Nested Routes */
  nestedRoutes?: RouteItemDef[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RouteComponentDef = ComponentType<any>;

export type RouteItemDef = {
  id: string;
  path: string;
  navigationTitle?: string;
  component: RouteComponentDef;
  layout?: ReactNode;
  nestedRoutes?: Array<RouteItemDef | RouteGroupDef>;
  hideInNavigation?: boolean;
};

export type RouteWrapperConfigDef = {
  isProtectedRoute?: boolean;
};

export type RedirectDef = {
  redirect: string;
};
