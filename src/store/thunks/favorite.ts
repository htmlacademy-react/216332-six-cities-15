import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../../const';
import {Offer} from '../../types/offer';
import {FavoriteStatus} from '../../const';

type FavoriteProps = {
  id: string;
  status: FavoriteStatus;
};

type ChangeResponse = {
  offer: Offer;
  status: FavoriteStatus;
}

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], void, {extra: AxiosInstance}>
(
  'data/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  },
);

export const changeFavoriteOfferAction = createAsyncThunk<ChangeResponse, FavoriteProps, {extra: AxiosInstance}>
(
  'data/changeFavoriteOffer',
  async ({id, status}, {extra: api}) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${status}`);
    return {offer: data, status};
  },
);
