import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../../const';
import {Offer} from '../../types/offer';

export const fetchNearByAction = createAsyncThunk<Offer[], string, {extra: AxiosInstance}>
(
  'data/fetchOfferNearBy',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}${APIRoute.NearBy}`);
    return data;
  },
);
