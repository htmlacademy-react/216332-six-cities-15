import {Offer} from '../types/offer';
const MAX_ELEMENTS = 3;

export const filterOffers = (elements: Offer[], currentOffer: Offer): Offer[] => {
  const result: Offer[] = [];

  elements.forEach((offer) => {
    if (
      offer.city.name === currentOffer.city.name
      && offer.id !== currentOffer.id
      && result.length < MAX_ELEMENTS
    ) {
      result .push(offer);
    }
  });

  return result;
};
