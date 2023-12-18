import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_POST_ORDER } from '../utils/constants/api';
import { fetchWithRefresh } from '../utils/helpers/helpers';
import { ACCESS_TOKEN } from '../utils/constants/consts';

const initialState = {
  loading: false,
  failed: false,
  order: null,
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (order, { rejectWithValue}) => {
    try {
      const data = await fetchWithRefresh(API_POST_ORDER, {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(ACCESS_TOKEN),
        },
      });
      return data.order;
    } catch (err) {
      return rejectWithValue(err?.message);
    }
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

const selectOrder = store => store.order;

export { selectOrder };
export const { removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
