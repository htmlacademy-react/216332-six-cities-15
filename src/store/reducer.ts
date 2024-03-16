import {createReducer, current} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers';
import {cities} from '../mocks/cities';
import {comments} from '../mocks/comments';
import {CitiesType} from '../const';
import {setCity, filterCity, selectOffer, resetOffer} from './action';
import {Offer} from '../types/offer';

const initialState = {
  offers,
  cities,
  selectedCity: CitiesType.Paris,
  currentOffer: null,
  comments: comments
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const {selectedCity} = action.payload;
      state.selectedCity = selectedCity;
    })
    .addCase(filterCity, (state) => {
      const {selectedCity}: string = current(state);
      state.offers = offers.filter((offer: Offer) => offer.city.name === selectedCity);
    })
    .addCase(selectOffer, (state, action) => {
      const {id} = action.payload;
      state.currentOffer = offers.find((offer) => offer.id === id);
    })
    .addCase(resetOffer, (state) => {
      state.currentOffer = null;
    });
});

export {reducer};
