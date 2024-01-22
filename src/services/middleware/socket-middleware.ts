import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Middleware,
} from '@reduxjs/toolkit';
import { refreshToken } from '../../utils/helpers/helpers';
import { RootState } from '../store';

const ERR_TOKEN_OBSOLETE = 'Invalid or missing token';

export type TWsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onUpdate: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (
  wsActions: TWsActionTypes
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      wsConnect,
      wsDisconnect,
      onUpdate,
      onError,
      onClose,
    } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;

      if (wsConnect.match(action)) {
        const url = action.payload;
        socket = new WebSocket(url);

        socket.onerror = () => {
          dispatch(onError('Check the socket connection'));
        };

        socket.onclose = () => {
          dispatch(onClose());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onUpdate(parsedData));
          if (parsedData.message === ERR_TOKEN_OBSOLETE) {
            refreshToken()
              .then(refreshData => {
                const wssUrl = new URL(url);
                wssUrl.searchParams.set(
                  "token",
                  refreshData.accessToken.replace('Bearer ', '')
                );
                dispatch(wsConnect(wssUrl.toString()))
              })
              .catch(err => {
                dispatch(onError(err.message));
              })

            dispatch(wsDisconnect());
            return;
          }
        }
      }

      if (socket && wsDisconnect.match(action)) {
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};
