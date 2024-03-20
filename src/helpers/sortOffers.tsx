import {Offer} from '../types/offer';
import {SORT_OPTIONS} from '../const';

export const sortOffers = (offers: Offer[], activeSort: string): Offer[] => {
  let sortedOffers;
  switch (activeSort) {
    case SORT_OPTIONS.popular:
      sortedOffers = [...offers];
      break;
    case SORT_OPTIONS.priceLowToHigh:
      sortedOffers = [...offers].sort((a, b) => a.price - b.price);
      break;
    case SORT_OPTIONS.priceHighToLow:
      sortedOffers = [...offers].sort((a, b) => b.price - a.price);
      break;
    case SORT_OPTIONS.topRatedFirst:
      sortedOffers = [...offers].sort((a, b) => b.rating - a.rating);
      break;
    default:
      sortedOffers = [...offers];
  }

  return sortedOffers;
};
