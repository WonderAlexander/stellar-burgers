import { useDispatch, useSelector } from '../../services/store';
import { RootState } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '@components';
import { BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredientsSlice';

export const ConstructorPage: FC = () => {
  // хук useDispatch для отправки экшенов
  const dispatch = useDispatch();

  /** TODO: взять переменную из стора */
  const { isIngredientsLoading } = useSelector(
    (state: RootState) => state.ingredients
  );

  // Вызов асинхроннного экшена для получения списка ингридиентов с сервера
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
