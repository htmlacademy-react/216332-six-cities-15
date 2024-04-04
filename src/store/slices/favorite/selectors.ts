import {NameSpace} from '../../../const';
import {State} from '../../../types/state';
import {Offer} from '../../../types/offer';
import {RequestsStatus} from '../../../const';

export const getFavoriteOffers = (state: State): Offer[] | [] => state[NameSpace.Favorite].offers;
export const getFavoriteOfferStatus = (state: State): RequestsStatus => state[NameSpace.Favorite].status;
export const getFavoriteOfferErrorStatus = (state: State): boolean => state[NameSpace.Favorite].hasError;
