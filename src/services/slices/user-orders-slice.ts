import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersItem, TOrders } from '../../utils/types/orders-types';
import { RootState } from '../store';

type TUserOrdersState = {
  orders: TOrdersItem[];
  ordersByNumber: {
    [key: string]: TOrdersItem;
  } | null;
  failed: string | null;
};

const initialState: TUserOrdersState = {
  orders: [],
  ordersByNumber: null,
  failed: null,
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    updateUserOrders: (state, action: PayloadAction<TOrders>) => {
      state.orders = action.payload.orders;
      state.ordersByNumber = action.payload.orders.reduce((acc, item) =>
        ({...acc, [item.number]: item}), {});
      state.failed = null;
    },
    wsUserOrdersError: (state, action: PayloadAction<string>) => {
      state.failed = action.payload;
    },
    wsUserOrdersClose: (state) => {
      state.failed = null;
    }
  }
});

export const wsUserOrdersSocketConnect = createAction<string, 'userOrdersSocketConnect'>('userOrdersSocketConnect');
export const wsUserOrdersSocketDisconnect = createAction('userOrdersSocketDisconnect');

type TUserOrdersActionCreators = typeof userOrdersSlice.actions;
export type TUserOrdersActions =
  | ReturnType<typeof wsUserOrdersSocketConnect>
  | ReturnType<typeof wsUserOrdersSocketDisconnect>
  | ReturnType<TUserOrdersActionCreators[keyof TUserOrdersActionCreators]>;

const selectUserOrders = (store: RootState) => store.userOrders.orders;
const selectUserOrdersByNumber = (store: RootState, number: string) =>
  store.userOrders.ordersByNumber?.[number];

export { selectUserOrders, selectUserOrdersByNumber };
export const { updateUserOrders, wsUserOrdersError, wsUserOrdersClose } = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
