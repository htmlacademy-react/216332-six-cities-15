import {createReducer, current} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers';
import {CitiesType} from '../const';
import {setCity, filterCity} from './action';
import {Offer} from '../types/offer';

const initialState = {
  offers,
  selectedCity: CitiesType.Amsterdam
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
    });
});

export {reducer};
