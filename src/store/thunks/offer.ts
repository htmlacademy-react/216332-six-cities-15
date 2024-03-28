import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../../const';
import {OfferPreview} from '../../types/offer-preview';

export const fetchOfferAction = createAsyncThunk<OfferPreview, {id: string}, {extra: AxiosInstance}>
(
  'data/fetchOffer',
  async ({id}, {extra: api}) => {
    const {data} = await api.get<OfferPreview>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);
