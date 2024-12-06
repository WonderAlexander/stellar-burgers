import { constructorSlice } from '../services/slices/constructorSlice';
import { feedsSlice } from '../services/slices/feedsSlice';
import { ingredientsSlice } from '../services/slices/ingredientsSlice';
import { orderSlice } from '../services/slices/orderSlice';
import { ordersSlice } from '../services/slices/ordersSlice';
import { rootReducer } from '../services/store';
import { userSlice } from '../services/slices/userSlice';

describe('rootReducer', () => {
  it('Проверяем инициализацию стора', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual({
      ingredients: ingredientsSlice.reducer(undefined, initAction),
      burger: constructorSlice.reducer(undefined, initAction),
      feeds: feedsSlice.reducer(undefined, initAction),
      user: userSlice.reducer(undefined, initAction),
      order: orderSlice.reducer(undefined, initAction),
      orders: ordersSlice.reducer(undefined, initAction),
    });
  });
});
