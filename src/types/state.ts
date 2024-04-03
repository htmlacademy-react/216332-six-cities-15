import {store} from '../store';
import {AuthorizationStatus, RequestsStatus} from '../const';
import {Offer} from './offer';
import {OfferPreview} from './offer-preview';
import {Comment} from './comment';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserInfo | null;
  status: RequestsStatus;
};

export type UserInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export type OffersData = {
  activeId: string | null;
  offers: Offer[];
  status: RequestsStatus;
  hasError: boolean;
};

export type NearOffersData = {
  activeId?: string | null;
  offers: OfferPreview[];
  status: RequestsStatus;
  hasError: boolean;
};

export type OfferData = {
  info: Offer | null;
  status: RequestsStatus;
  hasError: boolean;
};

export type FavoriteData = {
  status: 0 | 1;
}

export type CommentsData = {
  comments: Comment[];
  status: RequestsStatus;
  hasError: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
