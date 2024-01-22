import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from '../services/store';
import type {} from "redux-thunk/extend-redux";

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
