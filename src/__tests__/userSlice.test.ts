import { RequestStatus, TUser } from '@utils-types';
import {
  userAuthCheck,
  userAuth,
  initialState,
  userLogIn,
  userRegister,
  IUserState,
  userUpdate,
  userLogOutCheck,
  userSlice
} from '../services/slices/userSlice';
import { TLoginData } from '@api';
import { act } from 'react-dom/test-utils';

describe('userSlice', () => {
  const userRegistrationData = {
    email: 'test@mail.com',
    name: 'name',
    password: 'password'
  };

  const userLoginDatata: TLoginData = {
    email: 'test@mail.com',
    password: 'password'
  };

  const userTestData: TUser = { email: 'test@test.ru', name: 'Bulat' };

  describe('test reducers', () => {
    it('Логин пользователя', () => {
      const expectedState = {
        ...initialState,
        isAuth: true
      };
      const actualState = userSlice.reducer(initialState, userAuthCheck());

      expect(actualState).toEqual(expectedState);
    });

    it('Логаут пользователя', () => {
      const actualState = userSlice.reducer(
        { ...initialState, data: userTestData },
        userLogOutCheck()
      );

      expect(actualState).toEqual(initialState);
    });
  });

  describe('test extra reducers ', () => {
    it('checkUserAuth.pending ', () => {
      const expectedState: IUserState = {
        isAuth: false,
        data: null,
        status: RequestStatus.Loading
      };
      const actualState = userSlice.reducer(
        initialState,
        userAuth.pending('checkUserAuth')
      );
      expect(actualState).toEqual(expectedState);
    });

    it(' checkUserAuth.rejected', () => {
      const expectedState = { ...initialState, status: RequestStatus.Failed };
      const actualState = userSlice.reducer(
        initialState,
        userAuth.rejected(new Error(), '')
      );
      expect(actualState).toEqual(expectedState);
    });

    it('checkUserAuth.fulfilled', () => {
      const expectedState = {
        ...initialState,
        data: userTestData,
        status: RequestStatus.Success
      };
      const actualState = userSlice.reducer(
        initialState,
        userAuth.fulfilled({ user: userTestData, success: true }, '')
      );
      expect(actualState).toEqual(expectedState);
    });

    it('registerUser.pending', () => {
      const expectedState = {
        ...initialState,
        status: RequestStatus.Loading
      };
      const actualState = userSlice.reducer(
        initialState,
        userRegister.pending('', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('registerUser.fulfilled', () => {
      const expectedState = {
        ...initialState,
        data: userTestData,
        status: RequestStatus.Success
      };
      const mockAuthResponceData = {
        success: true,
        refreshToken: 'test-refreshToken',
        accessToken: 'test-accessToken',
        user: userTestData
      };
      const actualState = userSlice.reducer(
        initialState,
        userRegister.fulfilled(mockAuthResponceData, '', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('registerUser.rejected', () => {
      const expectedState = {
        ...initialState,
        status: RequestStatus.Failed
      };
      const actualState = userSlice.reducer(
        initialState,
        userRegister.rejected(new Error(), '', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('loginUser.pending', () => {
      const expectedState = {
        ...initialState,
        status: RequestStatus.Loading
      };
      const actualState = userSlice.reducer(
        initialState,
        userLogIn.pending('', userLoginDatata)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('loginUser.fulfilled', () => {
      const expectedState: IUserState = {
        ...initialState,
        data: userTestData,
        status: RequestStatus.Success
      };
      const mockAuthResponceData = {
        success: true,
        refreshToken: 'test-refreshToken',
        accessToken: 'test-accessToken',
        user: userTestData
      };
      const actualState = userSlice.reducer(
        initialState,
        userLogIn.fulfilled(mockAuthResponceData, '', userLoginDatata)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('loginUser.rejected', () => {
      const expectedState = {
        ...initialState,
        status: RequestStatus.Failed
      };
      const actualState = userSlice.reducer(
        initialState,
        userLogIn.rejected(new Error(), '', userLoginDatata)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('updateUser.pending', () => {
      const expectedState = {
        ...initialState,
        status: RequestStatus.Loading
      };
      const actualState = userSlice.reducer(
        initialState,
        userUpdate.pending('', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('updateUser.rejected', () => {
      const expectedState = { ...initialState, status: RequestStatus.Failed };
      const actualState = userSlice.reducer(
        initialState,
        userUpdate.rejected(new Error(), '', userRegistrationData)
      );
      expect(actualState).toEqual(expectedState);
    });

    it('updateUser.fulfilled', () => {
      const expectedState = {
        ...initialState,
        data: userTestData,
        status: RequestStatus.Success
      };
      const actualState = userSlice.reducer(
        initialState,
        userUpdate.fulfilled(
          { success: true, user: userTestData },
          '',
          userRegistrationData
        )
      );
      expect(actualState).toEqual(expectedState);
    });
  });
});
