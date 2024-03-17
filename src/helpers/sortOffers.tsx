import {Offer} from '../types/offer';

export const sortOffers = (offers: Offer[], activeSort: number): Offer[] => {
  let sortedOffers;
  switch (activeSort) {
    case 0:
      sortedOffers = [...offers];
      break;
    case 1:
      sortedOffers = [...offers].sort((a, b) => a.price - b.price);
      break;
    case 2:
      sortedOffers = [...offers].sort((a, b) => b.price - a.price);
      break;
    case 3:
      sortedOffers = [...offers].sort((a, b) => b.rating - a.rating);
      break;
    default:
      sortedOffers = [...offers];
  }

  return sortedOffers;
};
