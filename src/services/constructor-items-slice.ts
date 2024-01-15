import { createSlice, current } from '@reduxjs/toolkit';
import { TYPE_BUN } from '../utils/constants/consts';
import { TConstructorItem } from '../utils/types/ingredients-types';

type State = {
  bun: TConstructorItem | null;
  ingredients: TConstructorItem[];
};

const initialState: State = {
  bun: null,
  ingredients: [],
};

export const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === TYPE_BUN) {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter((item) =>
        item.dragId !== action.payload
      );
    },
    reorder: (state, action) => {
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

// @ts-ignore
const selectBurgerConstructor = (store) => store.constructorItems;
// @ts-ignore
const selectBurgerIngredients = (store) => store.constructorItems.ingredients;

export { selectBurgerConstructor, selectBurgerIngredients };
export const { addIngredient, removeIngredient, clearBurger, reorder } = constructorItemsSlice.actions;

export default constructorItemsSlice.reducer;
