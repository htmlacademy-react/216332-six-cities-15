import {NameSpace} from '../../../const';
import {State} from '../../../types/state';
import {RequestsStatus} from '../../../const';
import {Offer} from '../../../types/offer';

export const getOffersNearBy = (state: State): Offer[] => state[NameSpace.Near].offers;
export const getOfferNearByStatus = (state: State): RequestsStatus => state[NameSpace.Near].status;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Offer].hasError;
