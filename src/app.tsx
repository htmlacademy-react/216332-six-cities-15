import {useEffect} from 'react';
import Main from './pages/main/main';
import Favorites from './pages/favorites/favorites';
import Login from './pages/login/login';
import OfferPage from './pages/offer/offer';
import PageNotFound from './pages/page-not-found/page-not-found';
import PrivateRoute from './components/private-route/private-route';
import {AppRoute} from './const';
import {Route, Routes} from 'react-router-dom';
import {useAppDispatch} from './hooks';
import {useAppSelector} from './hooks';
import {fetchOffersAction} from './store/thunks/offers';
import {fetchFavoriteOffersAction} from './store/thunks/favorite';
import {checkAuthAction} from './store/thunks/user';
import {getToken} from './services/token';
import {getAuthCheckedStatus} from './store/slices/user/selectors';

export default function App() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthCheckedStatus);
  const token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(checkAuthAction());
    }
    dispatch(fetchOffersAction());
  }, [token, dispatch]);

  useEffect(() => {
    if (token && authStatus) {
      dispatch(fetchFavoriteOffersAction());
    }
  }, [token, dispatch, authStatus]);

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
          <OfferPage/>
        }
      />
      <Route
        path="*"
        element={<PageNotFound type='page'/>}
      />
    </Routes>
  );
}
