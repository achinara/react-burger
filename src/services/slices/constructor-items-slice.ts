import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TYPE_BUN } from '../../utils/constants/consts';
import { TConstructorItem } from '../../utils/types/ingredients-types';

type ConstructorState = {
  bun: TConstructorItem | null;
  ingredients: TConstructorItem[];
};

export const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
};

export const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorItem>) => {
      if (action.payload.type === TYPE_BUN) {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((item) =>
        item.dragId !== action.payload
      );
    },
    reorder: (state, action: PayloadAction<{dragIndex: number, dropIndex: number}>) => {
      const { dragIndex, dropIndex } = action.payload;
      const nextItems = [...current(state.ingredients)];
      const prevElem = nextItems[dragIndex];
      nextItems.splice(dragIndex, 1);
      nextItems.splice(dropIndex, 0, prevElem);
      state.ingredients = nextItems;
    },
    clearBurger: () => {
      return {...initialState}
    }
  },
});

type TConstructorActionCreators = typeof constructorItemsSlice.actions;
export type TConstructorActions = ReturnType<TConstructorActionCreators[keyof TConstructorActionCreators]>;

const selectBurgerConstructor = (store: RootState) => store.constructorItems;
const selectBurgerIngredients = (store: RootState) => store.constructorItems.ingredients;

export { selectBurgerConstructor, selectBurgerIngredients };
export const { addIngredient, removeIngredient, clearBurger, reorder } = constructorItemsSlice.actions;

export default constructorItemsSlice.reducer;
