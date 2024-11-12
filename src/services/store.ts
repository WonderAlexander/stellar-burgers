import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsReducer } from './slices/ingredientsSlice';
import { constructorReducer } from './slices/constructorSlice';
import { feedsReducer } from './slices/feedsSlice';
import { userReducer } from './slices/userSlice';
import { orderReducer } from './slices/orderSlice';
import { ordersReducer } from './slices/ordersSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: constructorReducer,
  feeds: feedsReducer,
  user: userReducer,
  order: orderReducer,
  orders: ordersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

// Типизация хука useDispatch
export const useDispatch: () => AppDispatch = () => dispatchHook();

// Типизация хука useSelector
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
