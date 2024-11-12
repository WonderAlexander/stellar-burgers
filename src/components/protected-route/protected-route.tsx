import { TProtectedRouteProps } from '@utils-types';
import { useSelector } from '../../services/store';
import { selectAuthStatus, selectUser } from '../../services/slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

export const ProtectedRoute = ({
  children,
  IsUserAuthorized
}: TProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const userAuthStatus = useSelector(selectAuthStatus);
  const location = useLocation();
  if (!userAuthStatus) {
    return <Preloader />;
  }
  if (!IsUserAuthorized && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (IsUserAuthorized && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
};
