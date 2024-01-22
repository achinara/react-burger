import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/consts';
import { API_REFRESH_TOKEN } from '../constants/api';
import { TRefreshTokenData } from '../types/token-types';

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const clearUserTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const setUserTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

const request = <T>(url: string, options: RequestInit): Promise<T> => {
  return fetch(url, options).then(checkResponse<T>)
};

const refreshToken = (): Promise<TRefreshTokenData> => {
  return request<TRefreshTokenData>(API_REFRESH_TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem(REFRESH_TOKEN),
    }),
  });
};

export const getFetchError = (err: unknown): { message?: string | null } | null => {
  if (err && typeof err === 'object') {
    return err;
  }

  return null;
}


const fetchWithRefresh = async <T>(url: string, options: RequestInit): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err: unknown) {
    if (getFetchError(err)?.message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setUserTokens(refreshData.accessToken, refreshData.refreshToken);
      const headers = new Headers(options.headers);
      headers.set('Authorization', refreshData.accessToken);
      options.headers = headers;
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const formatNumber = (num: number):string => new Intl.NumberFormat("ru-RU").format(num);

export {
  formatNumber,
  checkResponse,
  refreshToken,
  clearUserTokens,
  setUserTokens,
  fetchWithRefresh,
  request,
}
