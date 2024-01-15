import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_FETCH_INGREDIENTS } from '../utils/constants/api';
import { TYPE_BUN } from '../utils/constants/consts';
import { TIngredient, TIngredientItem, TIngredientsData } from '../utils/types/ingredients-types';
import { checkResponse } from '../utils/helpers/helpers';

type State = {
  loading: boolean;
  failed: boolean;
  items: TIngredient[];
};

const initialState: State = {
  loading: false,
  failed: false,
  items: [],
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => {
    const res = await fetch(API_FETCH_INGREDIENTS);
    const { data } = await checkResponse<TIngredientsData>(res);
    return data;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    incrementCount: (state, action) => {
      const { id, dragType } = action.payload;
      const isBun = dragType === TYPE_BUN;
      
      state.items = state.items.map((item) => {
        if (isBun && item.type === TYPE_BUN && item._id !== id) {
          return {...item, count: 0}
        }
        
        return item._id === id
          ? {...item, count: isBun ? 2 : item.count + 1}
          : item
      });
    },
    decrementCount: (state, action) => {
      state.items = state.items.map((item) => item._id === action.payload
        ? {...item, count: Math.max(item.count - 1, 0)}
        : item
      )
    },
    clearIngredientsCount: (state) => {
      state.items = state.items.map((item) => item.count > 0
        ? {...item, count: 0}
        : item
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.failed = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.failed = false;
        state.items = action.payload.map((item: TIngredientItem) => ({...item, count: 0}));
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
        state.failed = true;
      })
  },
});

// @ts-ignore
const selectIngredients = store => store.ingredients;
// @ts-ignore
const selectIngredientItems = store => store.ingredients.items;
// @ts-ignore
const selectCurrentIngredient = (store, id?: string) => store.ingredients.items.find((item: TIngredient) => item._id === id);

export { selectIngredients, selectIngredientItems, selectCurrentIngredient };
export const { incrementCount, decrementCount, clearIngredientsCount } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
