import {City} from './city';
import {Location} from './location';

type OfferType = 'hotel' | 'house' | 'apartment' | 'room';

export type OfferPreview = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  previewImage?: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};
