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

export const toggleFavoriteStatusAction = createAsyncThunk<{id}, void>
(
  'data/toggleFavoriteOffer',
  async ({id}, {getState}) => {
    let offer: Offer | null = null;
    const state = getState().OFFERS;
    const index = state.offers.findIndex((offer): Offer => offer.id === id);
    if (index !== -1) {
      offer = {...state.offers[index]};
      offer.isFavorite = !offer.isFavorite;
    }
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve({offer, index}), 10);
    });

    return await promise;
  },
);
