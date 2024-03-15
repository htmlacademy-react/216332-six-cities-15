import {createAction} from '@reduxjs/toolkit';
import {CitiesType} from '../const';

export const setCity = createAction<{selectedCity: CitiesType}>('city/setCity');
export const filterCity = createAction('city/filterCity');
