import {createReducer, current} from '@reduxjs/toolkit';
import {cities} from '../mocks/cities';
import {CitiesType, AuthorizationStatus} from '../const';
import {
  setCity,
  selectOffer,
  resetOffer,
  loadOffers,
  requireAuthorization,
  setOffersDataLoadingStatus,
  setOfferDataLoadingStatus,
  loadOfferData,
  loadOfferComments,
  loadOfferNearBy
} from './action';
import {Offer} from '../types/offer';
import {City} from '../types/city';
import {OfferPreview} from '../types/offer-preview';

type initialStateType = {
  offers: Offer[];
  cities: City[];
  selectedCity: CitiesType;
  currentOffer: Offer | null;
  comments: Comment[];
  nearBy: OfferPreview[];
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
}

const initialState: initialStateType = {
  offers: [],
  cities: cities,
  selectedCity: CitiesType.Paris,
  currentOffer: null,
  comments: [],
  nearBy: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  isOfferDataLoading: true,
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
    .addCase(loadOfferData, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadOfferComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadOfferNearBy, (state, action) => {
      state.nearBy = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    });
});

export {reducer};
