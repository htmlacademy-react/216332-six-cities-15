import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, RequestsStatus} from '../../../const';
import {OffersData} from '../../../types/state';
import {fetchOffersAction} from '../../thunks/offers';

const initialState: OffersData = {
  offers: [],
  activeId: null,
  status: RequestsStatus.Idle,
  hasError: false,
};

const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setActiveId (state: OffersData, action: PayloadAction<string | null>) {
      state.activeId = action.payload;
    },
    updateOffers (state: OffersData, action: PayloadAction<string | null>) {
      const index = state.offers.findIndex((offer) => offer.id === action.payload);
      if (index !== -1) state.offers[index].isFavorite = !state.offers[index].isFavorite;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.status = RequestsStatus.Loading;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.status = RequestsStatus.Success;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.status = RequestsStatus.Failed;
        state.hasError = true;
      });
  }
});

export const {setActiveId, updateOffers} = offersData.actions;
export {offersData};
