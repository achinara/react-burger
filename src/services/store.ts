import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socket-middleware';
import constructorItemsReducer, { TConstructorActions } from './slices/constructor-items-slice';
import ingredientsReducer, { TIngredientsActions } from './slices/ingredients-slice';
import orderReducer, { TOrderActions } from './slices/order-slice';
import feedsReducer, {
  TFeedsActions,
  updateFeeds,
  wsFeedsError,
  wsFeedsClose,
  wsFeedsSocketConnect,
  wsFeedsSocketDisconnect
} from './slices/feeds-slice';
import userOrdersReducer, {
  TUserOrdersActions,
  updateUserOrders,
  wsUserOrdersError,
  wsUserOrdersClose,
  wsUserOrdersSocketConnect,
  wsUserOrdersSocketDisconnect,
} from './slices/user-orders-slice';
import userSlice, { TUserActions } from './slices/user-slice';

const reducer = combineReducers({
  constructorItems: constructorItemsReducer,
  ingredients: ingredientsReducer,
  userOrders: userOrdersReducer,
  feeds: feedsReducer,
  order: orderReducer,
  user: userSlice,
});

const feedMiddleware = socketMiddleware({
  wsConnect: wsFeedsSocketConnect,
  wsDisconnect: wsFeedsSocketDisconnect,
  onUpdate: updateFeeds,
  onError: wsFeedsError,
  onClose: wsFeedsClose,
});

const userOrdersMiddleware = socketMiddleware({
  wsConnect: wsUserOrdersSocketConnect,
  wsDisconnect: wsUserOrdersSocketDisconnect,
  onUpdate: updateUserOrders,
  onError: wsUserOrdersError,
  onClose: wsUserOrdersClose,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware, userOrdersMiddleware)
  },
});

export type AppActions =
  | TOrderActions
  | TFeedsActions
  | TUserActions
  | TUserOrdersActions
  | TConstructorActions
  | TIngredientsActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;
export type AppDispatch<ReturnType = void> = (action: AppActions | AppThunk<ReturnType>) => ReturnType;
export type RootState = ReturnType<typeof reducer>;
