import {createSlice} from '@reduxjs/toolkit';
import {FavoriteStatus, NameSpace, RequestsStatus} from '../../../const';
import {fetchFavoriteOffersAction, changeFavoriteOfferAction} from '../../thunks/favorite';
import {FavoriteOffersData} from '../../../types/state';

const initialState: FavoriteOffersData = {
  offers: [],
  status: RequestsStatus.Idle,
  hasError: false,
};

export const favoriteData = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.status = RequestsStatus.Loading;
        state.hasError = false;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.status = RequestsStatus.Success;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.status = RequestsStatus.Failed;
        state.hasError = true;
      })
      .addCase(changeFavoriteOfferAction.pending, (state) => {
        state.status = RequestsStatus.Loading;
      })
      .addCase(changeFavoriteOfferAction.fulfilled, (state, action) => {
        switch (action.payload.status) {
          case FavoriteStatus.Added:
            state.offers.push(action.payload.offer);
            break;
          case FavoriteStatus.Removed:
            state.offers = state.offers.filter((offer) => offer.id !== action.payload.offer.id);
            break;
        }
        state.status = RequestsStatus.Success;
      })
      .addCase(changeFavoriteOfferAction.rejected, (state) => {
        state.hasError = true;
      });
  }
});
