import { createSlice } from '@reduxjs/toolkit';

export const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState: null,
  reducers: {
    setCurrentIngredient: (state, action) => {
      return action.payload;
    },
    removeCurrentIngredient: () => {
      return null;
    }
  }
});

const selectCurrentIngredient = store => store.currentIngredient;

export { selectCurrentIngredient };
export const { setCurrentIngredient, removeCurrentIngredient } = currentIngredientSlice.actions;

export default currentIngredientSlice.reducer;
