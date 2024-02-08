import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  API_FORGOT_PASS,
  API_LOGIN,
  API_LOGOUT,
  API_REGISTER_USER,
  API_RESET_PASS,
  API_USER_FETCH,
} from '../../utils/constants/api';
import {
  clearUserTokens,
  fetchWithRefresh,
  setUserTokens,
  request,
  getFetchError,
} from '../../utils/helpers/helpers';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants/consts';

import {
  TUserFetchData,
  TUserAuthData,
  TPasswordData,
  TPassResetBody,
  TUserEmail,
  TUserData,
  TLoginBody,
  TUserRegisterBody,
} from '../../utils/types/user-types';

type THeaderOptions<T> = {
  method?: string;
  data?: T;
  withToken?: boolean;
};

const getOptions = <T>({ method = 'POST', data, withToken = false }: THeaderOptions<T>) => {
  const headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
  if (withToken) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      headers.set('Authorization', accessToken);
    }
  }

  return {
    method: method,
    headers,
    ...(data ? { body: JSON.stringify(data) } : null),
  };
};

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (accessToken) {
        const options = getOptions({ method: 'GET', withToken: true });
        const data = await fetchWithRefresh<TUserFetchData>(
          API_USER_FETCH,
          options,
        );
        return data.user;
      } else {
        return rejectWithValue('The user is not logged in');
      }
    } catch (err) {
      clearUserTokens();
      return rejectWithValue(getFetchError(err)?.message);
    }
  },
);

export const updateUserData = createAsyncThunk(
  'user/updateData',
  async (userData: TUserRegisterBody) => {
    const options = getOptions<TUserRegisterBody>({ method: 'PATCH', data: userData, withToken: true });
    const data = await fetchWithRefresh<TUserFetchData>(API_USER_FETCH, options);
    return data.user;
  }
)

export const auth = createAsyncThunk(
  'user/auth',
  async (userData: TUserRegisterBody) => {
    const options = getOptions<TUserRegisterBody>({ data: userData });
    const { accessToken, refreshToken, user } = await request<TUserAuthData>(API_REGISTER_USER, options);
    setUserTokens(accessToken, refreshToken);
    return user;
  },
);

export const login = createAsyncThunk(
  'user/login',
  async (userData: TLoginBody) => {
    const options = getOptions<TLoginBody>({ data: userData });
    const { accessToken, refreshToken, user } = await request<TUserAuthData>(API_LOGIN, options);
    setUserTokens(accessToken, refreshToken);
    return user;
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    const data = { token: localStorage.getItem(REFRESH_TOKEN) };
    const options = getOptions<{ token: string | null }>({ data });
    await request(API_LOGOUT, options);
    clearUserTokens();
  },
);

export const restorePassword = async (data: TUserEmail) => {
  try {
    const options = getOptions<TUserEmail>({ data });
    return await request<TPasswordData>(API_FORGOT_PASS, options);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const resetPassword = async (data: TPassResetBody) => {
  try {
    const options = getOptions<TPassResetBody>({ data });
    return await request<TPasswordData>(API_RESET_PASS, options);
  } catch (err) {
    return Promise.reject(err);
  }
}

type UserState = {
  isAuthChecked: boolean;
  user: null | TUserData;
  failed: string | null | undefined;
};

export const initialState: UserState = {
  isAuthChecked: false,
  user: null,
  failed: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserError: (state) => {
      state.failed = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.failed = null;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.failed = action.error?.message;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.failed = null;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
        state.failed = null;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.failed = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.failed = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.failed = action.error?.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.failed = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.failed = action.error?.message;
      })
  },
});

type TUserActionCreators = typeof userSlice.actions;
export type TUserActions = ReturnType<TUserActionCreators[keyof TUserActionCreators]>;

const selectAuthChecked = (store: RootState) => store.user.isAuthChecked;
const selectUser = (store: RootState) => store.user.user;
const selectUserError = (store: RootState) => store.user.failed;

export { selectAuthChecked, selectUser, selectUserError };
export const { resetUserError } = userSlice.actions;

export default userSlice.reducer;
