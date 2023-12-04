import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL_POST_ORDER } from '../utils/constants/urls';

const initialState = {
  loading: false,
  failed: false,
  order: null,
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (order) => {
    const res = await fetch(URL_POST_ORDER, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res?.ok) {
      throw new Error(`Response was not "ok", status is ${res.status}`);
    }
    const data = await res.json();
    return data?.order;
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
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.failed = true;
        state.order = null;
        console.log(action?.error?.message || action.payload);
      })
  }
});

export const { removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
