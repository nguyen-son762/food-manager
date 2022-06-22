import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import moment from 'moment';

import { ENV } from '@app/constants/env';
import { AuthEndpointsEnum, getTokens } from '@app/features/auth/auth';

/**
 * All the endpoint that do not require an access token
 */
const anonymousEndpoints = [AuthEndpointsEnum.LOGIN.toString()];

/**
 * "Wrapper" around getTokens
 * can be changed to have refresh functionality if api supports it
 */
export const getRefreshedToken = () => {
  const { accessToken, expiresAt } = getTokens();

  const isTokenExpired = moment().isSameOrAfter(expiresAt);

  return { accessToken, isTokenExpired };
};

/**
 * Adds authorization headers to API calls
 * @param {AxiosRequestConfig} request
 */
const authInterceptor = async (request: AxiosRequestConfig) => {
  const isAnonymous = anonymousEndpoints.some(endpoint =>
    request.url?.startsWith(endpoint)
  );

  const { accessToken } = getTokens();

  if (accessToken) {
    if (request && request.headers) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  }

  if (!accessToken && !isAnonymous) {
    // TODO: handle when UNAUTHORIZED;
    // return Promise.reject(ApiStatusCodes.UNAUTHORIZED);
    return request;
  }

  return request;
};

/**
 * Adds authorization headers to API calls
 * @param {AxiosResponse} response
 */
const responseInterceptor = async (response: AxiosResponse) => {
  if (response.status !== 200) {
    alert('Da co loi xay ra');
    window.location.assign('/error');
    return;
  }
  return response;
};
/** Setup an API instance */
export const api = axios.create({
  baseURL: ENV.API_HOST,
  headers: { 'Content-Type': 'application/json' }
});
export const apiForm = axios.create({
  baseURL: ENV.API_HOST,
  headers: { 'Content-Type': 'multipart/form-data' }
});
api.interceptors.request.use(authInterceptor);
api.interceptors.response.use(responseInterceptor);

apiForm.interceptors.request.use(authInterceptor);
apiForm.interceptors.response.use(responseInterceptor);
