import { configureStore } from '@reduxjs/toolkit'
import constructorItemsReducer from './constructor-items-slice';
import ingredientsReducer from './ingredients-slice';
import orderReducer from './order-slice';
import userSlice from './user-slice';

export const store = configureStore({
  reducer: {
    constructorItems: constructorItemsReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    user: userSlice,
  },
})
