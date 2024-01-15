import { TRefreshTokenData } from './token-types';

export type TUserEmail = {
  email: string;
};

export type TUserData = {
  email: string;
  name: string;
};

export type TUserAuthData = TRefreshTokenData & {
  user: TUserData;
};

export type TUserFetchData = {
  user: TUserData;
  success: boolean;
};

export type TPasswordData = {
  message: string;
  success: boolean;
};

export type TLoginBody = {
  email: string;
  password: string;
};

export type TUserRegisterBody = {
  name: string;
  email: string;
  password: string;
};

export type TPassResetBody = {
  password: string;
  token: string;
};
