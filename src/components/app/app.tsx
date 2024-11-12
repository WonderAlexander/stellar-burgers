import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Импорты страниц
import {
  NotFound404,
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  Profile,
  ProfileOrders,
  ResetPassword
} from '@pages';

// Импорты компонентов
import {
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';

// Импорты стилей
import '../../index.css';
import styles from './app.module.css';
import { useDispatch } from '../../services/store';
import { userAuth, userAuthCheck } from '../../services/slices/userSlice';
import { getIngredients } from '../../services/slices/ingredientsSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(userAuth())
      .unwrap()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(userAuthCheck()));
  }, [userAuthCheck]);

  // Функция закрытия модальеого окна
  function handleModalClose(): void {
    navigate(-1);
  }

  return (
    <div className={styles.app}>
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute IsUserAuthorized>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute IsUserAuthorized>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute IsUserAuthorized>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute IsUserAuthorized>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                Детали ингридиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Детали Заказа'} onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={'Детали Заказа'} onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
