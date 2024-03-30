import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, RequestsStatus} from '../../../const';
import {fetchNearByAction} from '../../thunks/nearBy';
import {OffersData} from '../../../types/state';

const initialState: OffersData = {
  offers: [],
  status: RequestsStatus.Idle,
  hasError: false,
};

export const nearByData = createSlice({
  name: NameSpace.Near,
  initialState,
  reducers: {},
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
  },
  selectors: {
    offers: (state: OffersData) => state.offers,
    offerStatus: (state: OffersData) => state.status,
    offerErrors: (state: OffersData) => state.hasError,
  }
});
