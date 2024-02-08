import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_FETCH_INGREDIENTS } from '../../utils/constants/api';
import { TYPE_BUN } from '../../utils/constants/consts';
import { RootState } from '../store';
import { TIngredient, TIngredientItem, TIngredientsData } from '../../utils/types/ingredients-types';
import { checkResponse } from '../../utils/helpers/helpers';

type TIngredientsById = {
  [id: string]: TIngredient;
};

type TIngredientsState = {
  loading: boolean;
  failed: boolean;
  items: TIngredient[];
  itemsByIds: TIngredientsById;
};

export const initialState: TIngredientsState = {
  loading: false,
  failed: false,
  items: [],
  itemsByIds: {},
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
    incrementCount: (state, action: PayloadAction<{id: string, dragType: string}>) => {
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
    decrementCount: (state, action: PayloadAction<string>) => {
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
        const items = action.payload.map((item: TIngredientItem) => ({...item, count: 0}));
        state.items = items;
        state.itemsByIds = items.reduce<TIngredientsById>((acc, item: TIngredient) => {
          acc[item._id] = item;
          return acc
        }, {});
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
        state.failed = true;
      })
  },
});

type TIngredientsActionCreators = typeof ingredientsSlice.actions;
export type TIngredientsActions = ReturnType<TIngredientsActionCreators[keyof TIngredientsActionCreators]>;

const selectIngredients = (store: RootState) => store.ingredients;
const selectIngredientItems = (store: RootState) => store.ingredients.items;
const selectCurrentIngredient = (store: RootState, id?: string) =>
  store.ingredients.items.find((item: TIngredient) => item._id === id);
const selectIngredientItemByIds = (store: RootState) => store.ingredients.itemsByIds;

export { selectIngredients, selectIngredientItems, selectCurrentIngredient, selectIngredientItemByIds };
export const { incrementCount, decrementCount, clearIngredientsCount } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
