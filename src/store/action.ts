import {createAction} from '@reduxjs/toolkit';
import {CitiesType} from '../const';
import {Offer} from '../types/offer';
import {AuthorizationStatus, AppRoute} from '../const';

export const setCity = createAction<{selectedCity: CitiesType}>('city/setCity');
export const selectOffer = createAction<{id: string}>('offer/selectOffer');
export const resetOffer = createAction('offer/resetOffer');
export const loadOffers = createAction<Offer[]>('offer/loadOffers');
export const loadCurrentOffer = createAction<{id: string}>('offer/loadCurrentOffer');
export const loadOfferComments = createAction<{id: string}>('offer/loadOfferComments');
export const loadOfferNearBy = createAction<{id: string}>('offer/loadOfferNearBy');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const setOfferDataLoadingStatus = createAction<boolean>('data/setOfferDataLoadingStatus');
export const redirectToRoute = createAction<AppRoute>('navigation/redirectToRoute');
