import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder, TOrdersData } from '@utils-types';
import { RootState } from '../store';

export interface TFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
}

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

export const feetchFeeds = createAsyncThunk('feetchFeeds', async () =>
  getFeedsApi()
);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(feetchFeeds.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        feetchFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          const { orders, total, totalToday } = action.payload;
          state.orders = orders;
          state.total = total;
          state.totalToday = totalToday;
          state.status = RequestStatus.Success;
        }
      )
      .addCase(feetchFeeds.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectFeeds: (state) => state,
    selectFeedsOrders: (state) => state.orders
  }
});

export const feedsReducer = feedsSlice.reducer;
export const { selectFeeds, selectFeedsOrders } = feedsSlice.selectors;
