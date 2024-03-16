import {createAction} from '@reduxjs/toolkit';
import {CitiesType} from '../const';

export const setCity = createAction<{selectedCity: CitiesType}>('city/setCity');
export const selectOffer = createAction<{id: string}>('offer/selectOffer');
export const resetOffer = createAction('offer/resetOffer');
export const filterCity = createAction('city/filterCity');
