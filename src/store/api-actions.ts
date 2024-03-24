import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {Offer} from '../types/offer';
import {
  loadOffers,
  requireAuthorization,
  setOffersDataLoadingStatus,
  setOfferDataLoadingStatus,
  redirectToRoute,
  loadOfferData,
  loadOfferComments,
  loadOfferNearBy
} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {CommentData} from '../types/comment-data';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchOfferCommentsAction = createAsyncThunk<void, {id: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferComments',
  async ({id}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
      dispatch(loadOfferComments(data));
    } catch (e) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
    // dispatch(setOffersDataLoadingStatus(true));
    // dispatch(setOffersDataLoadingStatus(false));
  },
);

export const submitOfferCommentAction = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/submitOfferComment',
  async ({id, comment, rating}, {dispatch, getState, extra: api}) => {
    try {
      const state = getState();
      const {data} = await api.post<Comment>(`${APIRoute.Comments}/${id}`, {comment, rating});
      dispatch(loadOfferComments([...state.comments, data]));
    } catch (e) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  },
);

export const fetchOfferNearByAction = createAsyncThunk<void, {id: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferNearBy',
  async ({id}, {dispatch, extra: api}) => {
    // dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}${APIRoute.NearBy}`);
    // dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOfferNearBy(data));
  },
);

export const fetchOfferDataAction = createAsyncThunk<void, {id: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferData',
  async ({id}, {dispatch, extra: api}) => {
    try {
      dispatch(setOfferDataLoadingStatus(true));
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      dispatch(loadOfferData(data));
      dispatch(setOfferDataLoadingStatus(false));
      dispatch(fetchOfferCommentsAction({id}));
      dispatch(fetchOfferNearByAction({id}));
    } catch (e) {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
