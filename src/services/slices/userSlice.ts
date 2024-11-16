import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import {
  getUserApi,
  TRegisterData,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  TAuthResponse
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

interface IUserState {
  isAuth: boolean;
  data: TUser | null;
  status: RequestStatus;
}

const initialState: IUserState = {
  isAuth: false,
  data: null,
  status: RequestStatus.Idle
};

export const userAuth = createAsyncThunk('checkUserAuth', async () => {
  const response = await getUserApi();
  return response;
});

export const userRegister = createAsyncThunk(
  'registerUser',
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const userLogIn = createAsyncThunk(
  'user/userLogIn',
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const userUpdate = createAsyncThunk(
  'updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const userLogOut = createAsyncThunk(
  'user/userLogOut',
  async (_, { dispatch }) => {
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userLogOutCheck());
    });
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAuthCheck: (state) => {
      state.isAuth = true;
    },
    userLogOutCheck: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuth.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = RequestStatus.Success;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = RequestStatus.Success;
      })
      .addCase(userLogIn.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = RequestStatus.Success;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = RequestStatus.Success;
      })
      .addCase(userAuth.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(userRegister.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(userLogIn.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(userUpdate.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(userAuth.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(userRegister.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(userLogIn.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(userUpdate.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  selectors: {
    selectUser: (state) => state.data,
    selectAuthStatus: (state) => state.isAuth
  }
});

export const userReducer = userSlice.reducer;
export const { userAuthCheck, userLogOutCheck } = userSlice.actions;
export const { selectUser, selectAuthStatus } = userSlice.selectors;
