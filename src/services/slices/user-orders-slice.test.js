import userOrdersReducer, { initialState } from './user-orders-slice';
import { ERROR_TEXT, ORDER } from '../../utils/constants/test-mock';

describe('User orders slice', () => {
  it('returns the initial state of User-Orders slice', () => {
    expect(userOrdersReducer(initialState, {})).toEqual(
      {
        orders: [],
        ordersByNumber: null,
        failed: null,
      }
    )
  });

  it('fetches user-orders', () => {
    const state = userOrdersReducer(initialState, {
      type: 'userOrders/updateUserOrders',
      payload: { orders: [ORDER] },
    });

    expect(state).toEqual({
      ...initialState,
      orders: [ORDER],
      ordersByNumber: {
        [ORDER.number]: ORDER
      }
    });
  });

  it('fetches feeds: handle an error', () => {
    const state = userOrdersReducer(initialState, {
      type: 'userOrders/wsUserOrdersError',
      payload: ERROR_TEXT,
    });

    expect(state).toEqual({
      ...initialState,
      failed: ERROR_TEXT,
    });
  });

  it('fetches feeds: lost connection', () => {
    const state = userOrdersReducer(initialState, {
      type: 'userOrders/wsUserOrdersClose',
    });

    expect(state).toEqual({
      ...initialState,
      failed: null,
    });
  });
});
