import {useEffect} from 'react';
import Main from './pages/main';
import Favorites from './pages/favorites';
import Login from './pages/login';
import OfferPage from './pages/offer';
import PageNotFound from './pages/pageNotFound';
import PrivateRoute from './components/private-route';
import {AppRoute} from './const';
import {Route, Routes} from 'react-router-dom';
import {useAppSelector} from './hooks';
import {useAppDispatch} from './hooks';
import {fetchOffersAction} from './store/thunks/offers';
import {checkAuthAction} from './store/thunks/user';
import {getAuthorizationStatus} from './store/slices/user/selectors';
import {getToken} from './services/token';

export default function App() {
  const dispatch = useAppDispatch();
  const token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(checkAuthAction());
    }
    dispatch(fetchOffersAction());
  }, [token, dispatch]);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={
          <Main/>
        }
      />
      <Route
        path={AppRoute.Login}
        element={
          <PrivateRoute onlyUnAuth>
            <Login/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute>
            <Favorites/>
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Offer}/:offerId`}
        element={
          <OfferPage
            authorizationStatus={authorizationStatus}
          />
        }
      />
      <Route
        path="*"
        element={<PageNotFound type='page'/>}
      />
    </Routes>
  );
}
