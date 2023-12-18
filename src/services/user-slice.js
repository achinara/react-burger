import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  API_FORGOT_PASS,
  API_LOGIN,
  API_LOGOUT,
  API_REGISTER_USER,
  API_RESET_PASS,
  API_USER_FETCH,
} from '../utils/constants/api';
import {
  checkResponse,
  clearUserTokens,
  fetchWithRefresh,
  setUserTokens,
} from '../utils/helpers/helpers';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants/consts';

const getOptions = ({ method = 'POST', data }) => ({
  method: method,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  ...(data ? { body: JSON.stringify(data) } : null),
});

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (accessToken) {
        const options = getOptions({ method: 'GET' });
        const data = await fetchWithRefresh(
          API_USER_FETCH,
          {
            ...options,
            headers: { ...options.headers, Authorization: accessToken },
          },
        );
        return data.user;
      } else {
        return rejectWithValue('The user is not logged in');
      }
    } catch (err) {
      clearUserTokens();
      return rejectWithValue(err?.message);
    }
  },
);

export const updateUserData = createAsyncThunk(
  'user/updateData',
  async (userData, { rejectWithValue }) => {
    try {
      const options = getOptions({ method: 'PATCH', data: userData });
      const data = await fetchWithRefresh(API_USER_FETCH, {
        ...options,
        headers: { ...options.headers, Authorization: localStorage.getItem(ACCESS_TOKEN) },
      });
      return data.user;
    } catch (err) {
      return rejectWithValue(err?.message);
    }
  }
)

export const auth = createAsyncThunk(
  'user/auth',
  async (userData, { rejectWithValue }) => {
    try {
      const options = getOptions({ data: userData });
      const res = await fetch(API_REGISTER_USER, options);
      const { accessToken, refreshToken, user } = await checkResponse(res);
      setUserTokens(accessToken, refreshToken);
      return user;
    } catch (err) {
      return rejectWithValue(err?.message);
    }
  },
);

export const login = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const options = getOptions({ data: userData });
      const res = await fetch(API_LOGIN, options);
      const { accessToken, refreshToken, user } = await checkResponse(res);
      setUserTokens(accessToken, refreshToken);
      return user;
    } catch (err) {
      return rejectWithValue(err?.message);
    }
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const data = { token: localStorage.getItem(REFRESH_TOKEN) };
      const options = getOptions({ data });
      await fetch(API_LOGOUT, options);
      clearUserTokens();
    } catch (err) {
      return rejectWithValue(err?.message);
    }
  },
);

export const restorePassword = async (data) => {
  try {
    const options = getOptions({ data });
    const res = await fetch(API_FORGOT_PASS, options);
    return checkResponse(res);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const resetPassword = async (data) => {
  try {
    const options = getOptions({ data });
    const res = await fetch(API_RESET_PASS, options);
    return checkResponse(res);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthChecked: false,
    user: null,
    failed: null,
  },
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
        state.failed = action.payload;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.failed = null;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
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
        state.failed = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.failed = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.failed = action.payload;
      })
  },
});

const selectAuthChecked = store => store.user.isAuthChecked;
const selectUser = store => store.user.user;
const selectUserError = store => store.user.failed;

export { selectAuthChecked, selectUser, selectUserError };
export const { resetUserError } = userSlice.actions;

export default userSlice.reducer;
