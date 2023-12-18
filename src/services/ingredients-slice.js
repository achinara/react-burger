import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_FETCH_INGREDIENTS } from '../utils/constants/api';
import { TYPE_BUN } from '../utils/constants/consts';
import { checkResponse } from '../utils/helpers/helpers';

const initialState = {
  loading: false,
  failed: false,
  items: [],
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_FETCH_INGREDIENTS);
      const { data } = await checkResponse(res);
      return data;
    } catch (err) {
      return rejectWithValue(err?.message);
    }
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
        state.items = action.payload.map((item) => ({...item, count: 0}));
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
        state.failed = true;
      })
  },
});

const selectIngredients = store => store.ingredients;
const selectIngredientItems = store => store.ingredients.items;
const selectCurrentIngredient = (store, id) => store.ingredients.items.find((item) => item._id === id);

export { selectIngredients, selectIngredientItems, selectCurrentIngredient };
export const { incrementCount, decrementCount, clearIngredientsCount } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
