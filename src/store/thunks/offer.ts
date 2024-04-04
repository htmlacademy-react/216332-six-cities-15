import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../../const';
import {Offer} from '../../types/offer';

export const fetchOfferAction = createAsyncThunk<Offer, string, {extra: AxiosInstance}>
(
  'data/fetchOffer',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);
