import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, RequestsStatus} from '../../../const';
import {fetchNearByAction} from '../../thunks/nearBy';
import {NearOffersData} from '../../../types/state';

const initialState: NearOffersData = {
  offers: [],
  status: RequestsStatus.Idle,
  hasError: false,
};

export const nearByData = createSlice({
  name: NameSpace.Near,
  initialState,
  reducers: {
    updateNearByOffers (state: NearOffersData, action: PayloadAction<string>) {
      const index = state.offers.findIndex((offer) => offer.id === action.payload);
      if (index !== -1) {
        state.offers[index].isFavorite = !state.offers[index].isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNearByAction.pending, (state) => {
        state.status = RequestsStatus.Loading;
        state.hasError = false;
      })
      .addCase(fetchNearByAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.status = RequestsStatus.Success;
      })
      .addCase(fetchNearByAction.rejected, (state) => {
        state.status = RequestsStatus.Failed;
        state.hasError = true;
      });
  }
});

export const {updateNearByOffers} = nearByData.actions;
