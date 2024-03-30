import {NameSpace} from '../../../const';
import {State} from '../../../types/state';
import {OfferPreview} from '../../../types/offer-preview';

export const getOffer = (state: State): OfferPreview => state[NameSpace.Offer].info;
export const getOfferStatus = (state: State): boolean => state[NameSpace.Offer].status;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Offer].hasError;
