import { configureStore } from '@reduxjs/toolkit'
import constructorItemsReducer from './constructor-items-slice';
import currentIngredientReducer from './current-ingredient-slice';
import ingredientsReducer from './ingredients-slice';
import orderReducer from './order-slice';

export const store = configureStore({
  reducer: {
    constructorItems: constructorItemsReducer,
    currentIngredient: currentIngredientReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
  },
})
