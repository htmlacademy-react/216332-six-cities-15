import {NameSpace, RequestsStatus} from '../../../const';
import {State} from '../../../types/state';
import {Offer} from '../../../types/offer';
import {getActiveCity} from '../cities/selectors';

export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
export const getActiveOfferId = (state: State): string | null => state[NameSpace.Offers].activeId;

export const getFilteredOffers = (state: State): Offer[] =>
  state[NameSpace.Offers].offers.filter((offer: Offer) =>
    offer.city.name === getActiveCity(state)
  );

export const getActiveOffer = (state: State): Offer | null | undefined =>
  getActiveOfferId(state) !== null
    ? state[NameSpace.Offers].offers.find((offer) => offer.id === getActiveOfferId(state))
    : null ;

export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Offers].status !== RequestsStatus.Success;
export const getOffersDataStatus = (state: State): RequestsStatus => state[NameSpace.Offers].status;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Offers].hasError;
