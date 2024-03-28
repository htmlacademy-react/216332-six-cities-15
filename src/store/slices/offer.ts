import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, RequestsStatus} from '../../const';
import {fetchOfferAction} from '../thunks/offer';
import {OfferData} from '../../types/state';

const initialState: OfferData = {
  info: null,
  status: RequestsStatus.Idle,
  hasError: false,
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.status = RequestsStatus.Loading;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.info = action.payload;
        state.status = RequestsStatus.Success;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.status = RequestsStatus.Failed;
        state.hasError = true;
      });
  },
  selectors: {
    info: (state: OfferData) => state.info,
    offerStatus: (state: OfferData) => state.status,
    offerErrors: (state: OfferData) => state.hasError,
  }
});
