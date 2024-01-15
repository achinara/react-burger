import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_POST_ORDER } from '../utils/constants/api';
import { fetchWithRefresh } from '../utils/helpers/helpers';
import { ACCESS_TOKEN } from '../utils/constants/consts';
import { TOrder, TOrderBody, TOrderData } from '../utils/types/order-types';

type State = {
  loading: boolean;
  failed: boolean;
  order: null | TOrder;
};

const initialState: State = {
  loading: false,
  failed: false,
  order: null,
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (order: TOrderBody) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const headers = new Headers({"Content-Type": "application/json"});
    if (accessToken) {
      headers.set('Authorization', accessToken);
    }
    const data = await fetchWithRefresh<TOrderData>(API_POST_ORDER, {
      method: "POST",
      body: JSON.stringify(order),
      headers,
    });
    return data.order;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    removeOrder: (state) => {
      state.loading = false;
      state.failed = false;
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.failed = false;
        state.order = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.failed = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
        state.failed = true;
        state.order = null;
      })
  }
});

// @ts-ignore
const selectOrder = store => store.order;

export { selectOrder };
export const { removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
