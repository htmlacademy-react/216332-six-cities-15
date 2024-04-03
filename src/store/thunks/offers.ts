import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../../const';
import {Offer} from '../../types/offer';

export const fetchOffersAction = createAsyncThunk<Offer[], void, {extra: AxiosInstance}>
(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);
