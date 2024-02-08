import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrders, TOrdersItem } from '../../utils/types/orders-types';
import { RootState } from '../store';

type TFeedsState = {
  feeds: TOrdersItem[];
  feedByNumber: {
    [key: string]: TOrdersItem;
  } | null;
  total: number;
  totalToday: number;
  failed: string | null;
};

export const initialState: TFeedsState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  feedByNumber: null,
  failed: null,
};

export const feedsSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateFeeds: (state, action: PayloadAction<TOrders>) => {
      state.feeds = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.feedByNumber = action.payload.orders.reduce((acc, item) =>
         ({...acc, [item.number]: item}), {});
      state.failed = null;
    },
    wsFeedsError: (state, action: PayloadAction<string>) => {
      state.failed = action.payload;
    },
    wsFeedsClose: (state) => {
      state.failed = null;
    }
  }
});

export const wsFeedsSocketConnect = createAction<string, 'ordersSocketConnect'>('ordersSocketConnect');
export const wsFeedsSocketDisconnect = createAction('ordersSocketDisconnect');

type TFeedsActionCreators = typeof feedsSlice.actions;
export type TFeedsActions =
  | ReturnType<typeof wsFeedsSocketConnect>
  | ReturnType<typeof wsFeedsSocketDisconnect>
  | ReturnType<TFeedsActionCreators[keyof TFeedsActionCreators]>;

const selectFeeds = (store: RootState) => store.feeds;
const selectFeedByNumber = (store: RootState, orderNumber: string) =>
  store.feeds.feedByNumber?.[orderNumber];

export { selectFeeds, selectFeedByNumber };
export const { updateFeeds, wsFeedsError, wsFeedsClose } = feedsSlice.actions;

export default feedsSlice.reducer;
