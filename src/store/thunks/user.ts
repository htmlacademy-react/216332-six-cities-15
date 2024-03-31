import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../../const';
import {UserData} from '../../types/user-data';
import {dropToken, saveToken} from '../../services/token';
import {AuthData} from '../../types/auth-data';
import {AppDispatch} from '../../types/state';

export const checkAuthAction = createAsyncThunk<undefined, void, {extra: AxiosInstance}>
(
  'user/checkAuth',
  async (_args, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {dispatch: AppDispatch; extra: AxiosInstance}>
(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<undefined, void, {extra: AxiosInstance}>
(
  'user/logout',
  async (_args, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

