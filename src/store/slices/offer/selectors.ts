import {NameSpace} from '../../../const';
import {State} from '../../../types/state';
import {Offer} from '../../../types/offer';
import {RequestsStatus} from '../../../const';

export const getOffer = (state: State): Offer | null => state[NameSpace.Offer].info;
export const getOfferStatus = (state: State): RequestsStatus => state[NameSpace.Offer].status;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Offer].hasError;
