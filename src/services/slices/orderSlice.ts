import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { RootState } from '../store';

export interface TOrderState {
  info: TOrder | null;
  status: RequestStatus;
}

export const initialState: TOrderState = {
  info: null,
  status: RequestStatus.Idle
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  (orderData: string[]) => {
    const response = orderBurgerApi(orderData).then(({ order }) => order);
    return response;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.info = null;
      state.status = RequestStatus.Idle;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.status = RequestStatus.Success;
          state.info = action.payload;
        }
      )
      .addCase(createOrder.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { resetOrder } = orderSlice.actions;
export const selectOrder = (state: RootState) => state.order;
