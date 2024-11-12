import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { getOrdersApi, getOrderByNumberApi } from '@api';

interface IOrdersState {
  orders: TOrder[];
  orderByNumber: TOrder[];
  status: RequestStatus;
}

export const initialState: IOrdersState = {
  orders: [],
  orderByNumber: [],
  status: RequestStatus.Idle
};

export const getOrders = createAsyncThunk('orders/getaOrders', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) =>
    getOrderByNumberApi(number).then(({ orders }) => orders)
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(getOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrderByNumber: (state) => state.orderByNumber
  }
});

export const ordersReducer = ordersSlice.reducer;
export const { selectOrders, selectOrderByNumber } = ordersSlice.selectors;
