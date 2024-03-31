import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../../const';
import {OfferPreview} from '../../types/offer-preview';

export const fetchNearByAction = createAsyncThunk<OfferPreview[], string, {extra: AxiosInstance}>
(
  'data/fetchOfferNearBy',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(`${APIRoute.Offers}/${id}${APIRoute.NearBy}`);
    return data;
  },
);
