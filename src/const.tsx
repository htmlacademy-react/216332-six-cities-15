export const TIMEOUT_SHOW_ERROR = 2000;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
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
}

interface SORT_OPTIONS_INTERFACE {
  [name: string]: string;
}

export const SORT_OPTIONS: SORT_OPTIONS_INTERFACE = {
  popular: 'Popular',
  priceLowToHigh: 'Price: low to high',
  priceHighToLow: 'Price: high to low',
  topRatedFirst: 'Top rated first'
};

export const URL_MARKER_DEFAULT =
  '/img/pin.svg';

export const URL_MARKER_CURRENT =
  '/img/pin-active.svg';
