import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

// import { getFeeds, getOrders } from '../../services/slices/feedsSlice-old';
//
// export const Feed: FC = () => {
//   const dispatch = useDispatch();
//   /** TODO: взять переменную из стора */
//   // Селектор из стора
//   const orders: TOrder[] = useSelector(getOrders);
//
//   const handleGetFeeds = useCallback(() => {
//     dispatch(getFeeds());
//   }, [dispatch]);
//
//   // Вызов асинхроннного экшена для получения списка ингридиентов с сервера
//   useEffect(() => {
//     handleGetFeeds();
//   }, [handleGetFeeds]);
//
//   if (!orders.length) {
//     return <Preloader />;
//   }
//
//   return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
// };

import {
  feetchFeeds,
  selectFeedsOrders
} from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const handleGetFeeds = useCallback(() => {
    dispatch(feetchFeeds());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(selectFeedsOrders);

  useEffect(() => {
    handleGetFeeds();
  }, [handleGetFeeds]);

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
