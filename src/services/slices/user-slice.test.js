import userReducer, { initialState, updateUserData, checkUserAuth, auth, login, logout } from './user-slice';
import { USER, ERROR_TEXT } from '../../utils/constants/test-mock';

describe('User slice', () => {
  it('returns the initial state of user-slice', () => {
    expect(userReducer(initialState, {})).toEqual(
      {
        isAuthChecked: false,
        user: null,
        failed: null,
      }
    )
  });

  it('is updating userData: fulfilled', () => {
    const state = userReducer(initialState, {
      type: updateUserData.fulfilled.type,
      payload: {
        ...USER,
        name: 'Clara Zetkin',
      }
    });

    expect(state).toEqual({
      ...initialState, user: {...USER, name: 'Clara Zetkin'}
    });
  });

  it('is updating userData: rejected', () => {
    const state = userReducer(initialState, {
      type: updateUserData.rejected.type,
      error: {
        message: ERROR_TEXT
      },
    });

    expect(state).toEqual({
      ...initialState,
      failed: ERROR_TEXT,
    });
  });

  it('is checking user auth: fulfilled', () => {
    const state = userReducer(initialState, {
      type: checkUserAuth.fulfilled.type,
      payload: USER
    });

    expect(state).toEqual({
      ...initialState,
      user: USER,
      isAuthChecked: true,
    });
  });

  it('is checking user auth: rejected', () => {
    const state = userReducer(initialState, {
      type: checkUserAuth.rejected.type,
    });

    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  it('auths user: fulfilled', () => {
    const state = userReducer(initialState, {
      type: auth.fulfilled.type,
      payload: USER,
    });

    expect(state).toEqual({
      user: USER,
      isAuthChecked: true,
      failed: null,
    });
  });

  it('logins user: fulfilled', () => {
    const state = userReducer(initialState, {
      type: login.fulfilled.type,
      payload: USER,
    });

    expect(state).toEqual({
      user: USER,
      isAuthChecked: true,
      failed: null,
    });
  });

  it('logins user: rejected', () => {
    const state = userReducer(initialState, {
      type: login.rejected.type,
      error: {
        message: ERROR_TEXT
      },
    });

    expect(state).toEqual({
      ...initialState,
      failed: ERROR_TEXT,
    });
  });

  it('logouts user: fulfilled', () => {
    const state = userReducer(initialState, {
      type: logout.fulfilled.type,
    });

    expect(state).toEqual({
      ...initialState,
      user: null,
      failed: null,
    });
  });

  it('logouts user: rejected', () => {
    const state = userReducer(initialState, {
      type: logout.rejected.type,
      error: {
        message: ERROR_TEXT
      },
    });

    expect(state).toEqual({
      ...initialState,
      failed: ERROR_TEXT,
    });
  });
});
