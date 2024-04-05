import {RatingOption} from './types/rating-option';
import {City as CityType} from './types/city';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/not-found',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum CitiesType {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}


export enum CardType {
  Favorites = 'favorites',
  NearPlaces = 'near-places',
  Cities = 'cities',
}

export enum APIRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  NearBy = '/nearby',
}

interface SORT_OPTIONS_INTERFACE {
  [name: string]: string;
}

interface RATING_VARIANTS_INTERFACE {
  [name: string]: string;
}

export const SORT_OPTIONS: SORT_OPTIONS_INTERFACE = {
  popular: 'Popular',
  priceLowToHigh: 'Price: low to high',
  priceHighToLow: 'Price: high to low',
  topRatedFirst: 'Top rated first'
};

export const RATING_VARIANTS: RATING_VARIANTS_INTERFACE = {
  perfect: 'perfect',
  good: 'good',
  notBad: 'not bad',
  badly: 'badly',
  terribly: 'terribly',
};

export const RATING_OPTIONS: RatingOption[] = [
  {name: RATING_VARIANTS.perfect, stars: '5'},
  {name: RATING_VARIANTS.good, stars: '4'},
  {name: RATING_VARIANTS.notBad, stars: '3'},
  {name: RATING_VARIANTS.badly, stars: '2'},
  {name: RATING_VARIANTS.terribly, stars: '1'},
];

export const MIN_RATING = 0;
export const MIN_CHARACTERS = 50;

export const URL_MARKER_DEFAULT =
  '/img/pin.svg';

export const URL_MARKER_CURRENT =
  '/img/pin-active.svg';


export enum NameSpace {
  Offers = 'OFFERS',
  Near = 'NEAR',
  Offer = 'OFFER',
  Favorite = 'FAVORITE',
  User = 'USER',
  City = 'CITY',
  Comments = 'COMMENTS',
}

export const enum RequestsStatus {Idle, Loading, Success, Failed}

export const enum FavoriteStatus { Removed, Added }

export const CITIES: CityType[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
];

export const MAX_COMMENTS = 10;
export const MAX_NEAR_OFFERS = 3;
export const MAX_CHARACTERS = 300;

