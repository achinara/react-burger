import constructorItemsReducer from './constructor-items-slice';
import { initialState } from './constructor-items-slice';
import { CONSTRUCTOR_ITEMS } from '../../utils/constants/test-mock';

describe('Constructor-items slice', () => {
  it('returns the initial state of the Constructor', () => {
    expect(constructorItemsReducer(initialState, {})).toEqual(
      {
        bun: null,
        ingredients: [],
      }
    )
  });
  
  it('adds an ingredient to the Constructor', () => {
    const state = constructorItemsReducer(initialState, {
      type: 'constructorItems/addIngredient',
      payload: CONSTRUCTOR_ITEMS[0],
    });
  
    expect(state).toEqual({
      ...initialState,
      ingredients: [
        ...initialState.ingredients,
        CONSTRUCTOR_ITEMS[0],
      ],
    });
  });

  it('removes an ingredient from the Constructor', () => {
    const state = constructorItemsReducer(initialState, {
      type: 'constructorItems/removeIngredient',
      payload: 'test_drag_id1',
    });

    expect(state).toEqual(initialState);
  });

  it('reorders ingredients in the Constructor', () => {
    const prev = { ...initialState, ingredients: CONSTRUCTOR_ITEMS };

    const state = constructorItemsReducer(prev, {
      type: 'constructorItems/reorder',
      payload: { dragIndex: 0, dropIndex: 1 },
    });

    expect(state).toEqual({...prev, ingredients: CONSTRUCTOR_ITEMS.reverse()});
  });

  it('cleans the Constructor', () => {
    const prev = { ...initialState, ingredients: CONSTRUCTOR_ITEMS };
    
    const state = constructorItemsReducer(prev, {
      type: 'constructorItems/clearBurger',
    });

    expect(state).toEqual(initialState);
  });
});
