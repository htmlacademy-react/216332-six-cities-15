import {NameSpace} from '../../../const';
import {State, UserInfo} from '../../../types/state';
import {AuthorizationStatus} from '../../../const';
import {RequestsStatus} from '../../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserInfoStatus = (state: State): RequestsStatus => state[NameSpace.User].status;
export const getUserInfo = (state: State): UserInfo | null => state[NameSpace.User].user;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
