import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_ORDER } from '../../utils/constants/api';
import { RootState } from '../store';
import { checkResponse, fetchWithRefresh } from '../../utils/helpers/helpers';
import { ACCESS_TOKEN } from '../../utils/constants/consts';
import { TOrder, TOrderBody, TOrderData } from '../../utils/types/order-types';
import { TFetchOrder } from '../../utils/types/orders-types';

type OrderState = {
  loading: boolean;
  failed: boolean;
  order: null | TOrder;
  orderByNumber: {
    [key: string]: TOrder,
  } | null
};

const initialState: OrderState = {
  loading: false,
  failed: false,
  order: null,
  orderByNumber: null,
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (order: TOrderBody) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const headers = new Headers({"Content-Type": "application/json"});
    if (accessToken) {
      headers.set('Authorization', accessToken);
    }
    const data = await fetchWithRefresh<TOrderData>(API_ORDER, {
      method: "POST",
      body: JSON.stringify(order),
      headers,
    });
    return data.order;
  }
);

export const fetchOrder = createAsyncThunk(
  'order/fetch',
  async (orderNumber: string)=> {
    const res = await fetch(`${API_ORDER}/${orderNumber}`);
    const { orders } = await checkResponse<TFetchOrder>(res);
    return {number: orderNumber, order: orders[0]};
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
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.failed = false;
        state.orderByNumber = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.failed = false;
        state.orderByNumber = {
          [action.payload.number]: action.payload.order
        };
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.loading = false;
        state.failed = true;
        state.orderByNumber = null;
      })
  }
});

type TOrderActionCreators = typeof orderSlice.actions;
export type TOrderActions = ReturnType<TOrderActionCreators[keyof TOrderActionCreators]>;

const selectOrder = (store: RootState) => store.order;
const selectOrderByNumber = (store: RootState, orderNumber: string) =>
  store.order.orderByNumber?.[orderNumber];

export { selectOrder, selectOrderByNumber };
export const { removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
