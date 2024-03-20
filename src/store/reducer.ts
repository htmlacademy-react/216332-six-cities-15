import {createReducer} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers';
import {cities} from '../mocks/cities';
import {comments} from '../mocks/comments';
import {CitiesType, AuthorizationStatus} from '../const';
import {setCity, selectOffer, resetOffer, loadOffers, requireAuthorization, setError} from './action';

const initialState = {
  offers: offers,
  cities: cities,
  selectedCity: CitiesType.Paris,
  currentOffer: null,
  comments: comments,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const {selectedCity} = action.payload;
      state.selectedCity = selectedCity;
    })
    .addCase(selectOffer, (state, action) => {
      const {id} = action.payload;
      state.currentOffer = offers.find((offer) => offer.id === id);
    })
    .addCase(resetOffer, (state) => {
      state.currentOffer = null;
    })
    .addCase(loadOffers, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
