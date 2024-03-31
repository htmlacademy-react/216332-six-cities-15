import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';

import {userProcess} from './slices/user/user';
import {offersData} from './slices/offers/offers';
import {offerData} from './slices/offer/offer';
import {citiesData} from './slices/cities/cities';
import {commentsData} from './slices/comments/comments';
import {nearByData} from './slices/nearBy/nearBy';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.City]: citiesData.reducer,
  [NameSpace.Comments]: commentsData.reducer,
  [NameSpace.Near]: nearByData.reducer,
});
