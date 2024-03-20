import {createReducer, current} from '@reduxjs/toolkit';
import {cities} from '../mocks/cities';
import {comments} from '../mocks/comments';
import {CitiesType, AuthorizationStatus} from '../const';
import {setCity, selectOffer, resetOffer, loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus} from './action';

const initialState = {
  offers: [],
  cities: cities,
  selectedCity: CitiesType.Paris,
  currentOffer: null,
  comments: comments,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const {selectedCity} = action.payload;
      state.selectedCity = selectedCity;
    })
    .addCase(selectOffer, (state, action) => {
      const {id} = action.payload;
      state.currentOffer = current(state.offers).find((offer) => offer.id === id);
    })
    .addCase(resetOffer, (state) => {
      state.currentOffer = null;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export {reducer};
