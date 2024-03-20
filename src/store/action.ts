import {createAction} from '@reduxjs/toolkit';
import {CitiesType} from '../const';
import {Offer} from '../types/offer';
import {AuthorizationStatus} from '../const';

export const setCity = createAction<{selectedCity: CitiesType}>('city/setCity');
export const selectOffer = createAction<{id: string}>('offer/selectOffer');
export const resetOffer = createAction('offer/resetOffer');
export const loadOffers = createAction<Offer[]>('offer/loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string | null>('status/setError');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
