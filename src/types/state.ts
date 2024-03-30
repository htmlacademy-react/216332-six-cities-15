import {store} from '../store';
import {AuthorizationStatus, RequestsStatus} from '../const';
import {Offer} from './offer';
import {OfferPreview} from './offer-preview';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type OffersData = {
  activeId: string | null;
  offers: Offer[];
  status: RequestsStatus;
  hasError: boolean;
};

export type OfferData = {
  info: OfferPreview | null;
  status: RequestsStatus;
  hasError: boolean;
};

export type CommentsData = {
  comments: Comment[];
  status: RequestsStatus;
  hasError: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
