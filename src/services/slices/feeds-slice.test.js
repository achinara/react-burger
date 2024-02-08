import feedsReducer, { initialState } from './feeds-slice';
import { ERROR_TEXT, ORDER } from '../../utils/constants/test-mock';

describe('Feeds slice', () => {
  it('returns the initial state of feeds-slice', () => {
    expect(feedsReducer(initialState, {})).toEqual(
      {
        feeds: [],
        total: 0,
        totalToday: 0,
        feedByNumber: null,
        failed: null,
      }
    )
  });

  it('fetches feeds', () => {
    const state = feedsReducer(initialState, {
      type: 'orders/updateFeeds',
      payload: { orders: [ORDER], total: 5, totalToday: 1 },
    });

    expect(state).toEqual({
      ...initialState,
      feeds: [ORDER],
      total: 5,
      totalToday: 1,
      feedByNumber: {
        [ORDER.number]: ORDER
      }
    });
  });

  it('fetches feeds: handle an error', () => {
    const state = feedsReducer(initialState, {
      type: 'orders/wsFeedsError',
      payload: ERROR_TEXT,
    });

    expect(state).toEqual({
      ...initialState,
      failed: ERROR_TEXT,
    });
  });

  it('fetches feeds: lost connection', () => {
    const state = feedsReducer(initialState, {
      type: 'orders/wsFeedsClose',
    });

    expect(state).toEqual({
      ...initialState,
      failed: null,
    });
  });
});
