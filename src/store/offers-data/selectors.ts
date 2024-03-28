import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';

export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
export const getOffersStatus = (state: State): boolean => state[NameSpace.Offers].status;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Offers].hasError;
