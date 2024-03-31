import { Location, Navigate, useLocation } from 'react-router-dom';
import {AppRoute, RequestsStatus} from '../const';
import {useAppSelector} from '../hooks';
import Loader from './loader';
import {getUserInfoStatus} from '../store/slices/user/selectors';
import {getUserInfo} from '../store/slices/user/selectors';

type PrivateRouteProps = {
  onlyUnAuth?: boolean;
  children: JSX.Element;
}

type LocationState = {
  from?: Location;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {onlyUnAuth, children} = props;
  const location: Location<LocationState> = useLocation() as Location<LocationState>;
  const userStatus = useAppSelector(getUserInfoStatus);
  const userInfo = useAppSelector(getUserInfo);

  if (userStatus === RequestsStatus.Loading) {
    return <Loader />;
  }

  if (userInfo && onlyUnAuth) {
    const from = location.state?.from || { pathname: AppRoute.Root };
    return <Navigate to={from} />;
  }

  if (!userInfo && !onlyUnAuth) {
    return <Navigate to={AppRoute.Login} state={{ from: location }}/>;
  }

  return children;
}

export default PrivateRoute;
