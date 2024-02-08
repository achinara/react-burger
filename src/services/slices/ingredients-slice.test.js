import ingredientsReducer, { initialState, fetchIngredients } from './ingredients-slice';
import { INGREDIENTS } from '../../utils/constants/test-mock';

describe('Ingredients slice', () => {
  const ingredient = { ...INGREDIENTS[0], count: 0 };

  it('returns the initial state of ingredients', () => {
    expect(ingredientsReducer(initialState, {})).toEqual(
      {
        loading: false,
        failed: false,
        items: [],
        itemsByIds: {},
      }
    )
  });

  it('is fetching ingredients: pending', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.pending.type
    });
    
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('is fetching ingredients: fulfilled', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: [INGREDIENTS[0]],
    });
    
    expect(state).toEqual({
      ...initialState,
      loading: false,
      items: [ingredient],
      itemsByIds: {
        [ingredient._id]: ingredient
      }
    });
  });

  it('is fetching ingredients: rejected', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.rejected.type,
    });
    
    expect(state).toEqual({
      ...initialState,
      loading: false,
      failed: true,
    });
  });

  it('increments count of the ingredient', () => {
    const prev = { ...initialState, items: [ingredient] };

    const state = ingredientsReducer(prev, {
      type: 'ingredients/incrementCount',
      payload: { dragType: '', id: ingredient._id}
    });
    
    expect(state).toEqual({
      ...initialState,
      items: [{...ingredient, count: 1}]
    });
  });

  it('decrements count of the ingredient', () => {
    const prev = { ...initialState, items: [{ ...ingredient, count: 5 }] };
    
    const state = ingredientsReducer(prev, {
      type: 'ingredients/decrementCount',
      payload: ingredient._id
    });
    
    expect(state).toEqual({
      ...initialState,
      items: [{...ingredient, count: 4}]
    });
  });

  it('clears counts of ingredients', () => {
    const prev = { ...initialState, items: [{ ...ingredient, count: 3 }] };
    
    const state = ingredientsReducer(prev, {
      type: 'ingredients/clearIngredientsCount'
    });
    
    expect(state).toEqual({
      ...initialState,
      items: [{...ingredient, count: 0}]
    });
  });
});
