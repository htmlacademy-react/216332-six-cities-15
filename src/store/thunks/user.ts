import {APIRoute} from '../../const';
import {UserInfo} from '../../types/state';
import {dropToken, saveToken} from '../../services/token';
import {AuthData} from '../../types/auth-data';
import {createAppAsyncThunk} from '../../hooks';

export const checkAuthAction = createAppAsyncThunk<UserInfo, undefined>
(
  'user/checkAuth',
  async (_args, {extra: api}) => {
    const {data} = await api.get<UserInfo>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAppAsyncThunk<UserInfo, AuthData>
(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const {data} = await api.post<UserInfo>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAppAsyncThunk<void, undefined>
(
  'user/logout',
  async (_args, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

