import {createReducer} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers';
import {CitiesType} from '../const';
import {setCity, filterCity} from './action';
import {Offer} from '../types/offer';

const initialState = {
  offers,
  selectedCity: ''
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const {selectedCity} = action.payload;

      state.selectedCity = selectedCity;
    })
    .addCase(filterCity, (state, action) => {
      const {selectedCity}: CitiesType = action.payload;

      state.offers = state.offers.filter((offer: Offer) => offer.city.name === selectedCity);
    });
});

export {reducer};
