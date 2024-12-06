import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const currentUser = useSelector(selectUser);
  const currentUserName = currentUser?.name;
  return <AppHeaderUI userName={currentUserName || ''} />;
};
