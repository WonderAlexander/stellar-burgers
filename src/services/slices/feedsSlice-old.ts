import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

interface IInitialState {
  feeds: TOrdersData;
  error: string | null;
}

const initialState: IInitialState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  error: null
};

export const getFeeds = createAsyncThunk('feeds/getFeeds', async () =>
  getFeedsApi()
);

export const feedsSliceOld = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        if (action.error.message !== undefined) {
          state.error = action.error.message;
        }
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.error = null;
        state.feeds = action.payload;
      });
  },
  selectors: {
    getOrders: (state) => state.feeds.orders
  }
});

export const feedsReducer = feedsSliceOld.reducer;

export const { getOrders } = feedsSliceOld.selectors;
