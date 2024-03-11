import {Offer} from '../types/offer';
import {City} from '../types/city';
const MAX_ELEMENTS = 3;

export const filterOffers = (elements: Offer[], city: City, currentOffer: Offer): Offer[] => {
  const result: Offer[] = [];

  elements.forEach((offer) => {
    if (
      offer.city.name === city.name
      && offer.id !== currentOffer.id
      && result.length < MAX_ELEMENTS
    ) {
      result .push(offer);
    }
  });

  return result;
};
