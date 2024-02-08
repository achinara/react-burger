import orderReducer, { initialState, createOrder, fetchOrder } from './order-slice';
import { ORDER } from '../../utils/constants/test-mock';

describe('Order slice', () => {
  it('returns the initial state of order-slice', () => {
    expect(orderReducer(initialState, {})).toEqual(
      {
        loading: false,
        failed: false,
        order: null,
        orderByNumber: null,
      }
    )
  });

  it('creates an order: pending', () => {
    const state = orderReducer(initialState, {
      type: createOrder.pending.type,
    });

    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('creates an order: fulfilled', () => {
    const state = orderReducer(initialState, {
      type: createOrder.fulfilled.type,
      payload: ORDER,
    });

    expect(state).toEqual({
      ...initialState,
      loading: false,
      order: ORDER
    });
  });

  it('creates an order: rejected', () => {
    const state = orderReducer(initialState, {
      type: createOrder.rejected.type
    });

    expect(state).toEqual({
      ...initialState,
      failed: true,
    });
  });

  it('fetches the order by number: pending', () => {
    const state = orderReducer(initialState, {
      type: fetchOrder.pending.type,
    });
    
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('fetches the order by number: fulfilled', () => {
    const state = orderReducer(initialState, {
      type: fetchOrder.fulfilled.type,
      payload: {
        order: ORDER,
        number: ORDER.number
      }
    });

    expect(state).toEqual({
      ...initialState,
      loading: false,
      orderByNumber: {
        [ORDER.number]: ORDER
      }
    });
  });

  it('fetches the order by number: rejected', () => {
    const state = orderReducer(initialState, {
      type: fetchOrder.rejected.type,
    });

    expect(state).toEqual({
      ...initialState,
      loading: false,
      orderByNumber: null,
      failed: true,
    });
  });
});
