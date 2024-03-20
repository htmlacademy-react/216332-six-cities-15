import {createReducer} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers';
import {cities} from '../mocks/cities';
import {comments} from '../mocks/comments';
import {CitiesType} from '../const';
import {setCity, selectOffer, resetOffer} from './action';
import {Offer} from '../types/offer';
import {City} from '../types/city';

type Offers = Offer[];
type Cities = City[];
type Comments = Comment[];

type InitialStateType = {
  offers: Offers;
  cities: Cities;
  selectedCity: CitiesType;
  currentOffer: Offer | null;
  comments: Comments;
};

const initialState = {
  offers: offers,
  cities: cities,
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
    .addCase(selectOffer, (state, action) => {
      const {id} = action.payload;
      state.currentOffer = offers.find((offer) => offer.id === id);
    })
    .addCase(resetOffer, (state) => {
      state.currentOffer = null;
    });
});

export {reducer};
