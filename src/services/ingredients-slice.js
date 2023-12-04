import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { URL_FETCH_INGREDIENTS } from '../utils/constants/urls';
import { TYPE_BUN } from '../utils/constants/consts';

const initialState = {
  loading: false,
  failed: false,
  items: [],
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => {
    const res = await fetch(URL_FETCH_INGREDIENTS);
    if (!res?.ok) {
      throw new Error(`Response was not "ok", status is ${res.status}`);
    }
    const { data } = await res.json();
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
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.failed = true;
        console.log(action?.error?.message || action.payload);
      })
  },
});

export const { incrementCount, decrementCount } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
