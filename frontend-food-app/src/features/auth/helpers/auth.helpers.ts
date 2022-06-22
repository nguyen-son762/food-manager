import moment from 'moment';
import cookie from 'react-cookies';

import { AUTH_ACCESS_TOKEN } from '../constants/auth.keys';
import { TokenDef, ApiResponseDef, InitialStateDef } from '../types/auth.types';

/**
 * Loads token from session cookie
 */
export const getTokens = () => {
  const cookieToken: TokenDef | undefined = cookie.load(AUTH_ACCESS_TOKEN);
  return {
    accessToken: cookieToken,
    refreshToken: cookieToken?.refreshToken,
    expiresAt: cookieToken?.expiresAt
  } as TokenDef;
};

/**
 * Save token and refresh token to session cookie,
 * Default value used for demo API
 */
export const saveTokens = ({ expiresIn = '86400', token }: ApiResponseDef) => {
  const cookieToken: TokenDef = {
    accessToken: token,
    expiresAt: moment().add(expiresIn, 'seconds').toDate()
  };
  cookie.save(AUTH_ACCESS_TOKEN, cookieToken.accessToken as string, {
    path: '/',
    expires: cookieToken.expiresAt
  });
  localStorage.setItem('auth', 'true');
};

/**
 * Clear token from session cookie
 */
export const clearTokens = () => {
  cookie.remove(AUTH_ACCESS_TOKEN, { path: '/' });
  localStorage.removeItem('auth');
};

/**
 * simplify code in slice with helper
 */
export const authErrorHelper = (state: InitialStateDef) => {
  state.user = null;
  state.isAuthenticated = false;
  state.error = true;
  state.loading = false;
};
