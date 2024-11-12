import { FC, useMemo } from 'react';
import { RequestStatus, TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  createOrder,
  resetOrder,
  selectOrder
} from '../../services/slices/orderSlice';
import { selectUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { resetIngredients } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    (state) => state.burger.constructorItems
  );
  const { info, status }: any = useSelector(selectOrder);

  const orderRequest = status === RequestStatus.Loading;

  const orderModalData = info;

  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    dispatch(
      createOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(
          (ing: TConstructorIngredient) => ing._id
        ),
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetIngredients());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <>
      <BurgerConstructorUI
        price={price}
        orderRequest={orderRequest}
        constructorItems={constructorItems}
        orderModalData={orderModalData}
        onOrderClick={onOrderClick}
        closeOrderModal={closeOrderModal}
      />
    </>
  );
};
