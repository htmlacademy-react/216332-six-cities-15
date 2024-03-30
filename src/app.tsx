import {useEffect} from 'react';
import Main from './pages/main';
import Favorites from './pages/favorites';
import Login from './pages/login';
import OfferPage from './pages/offer';
import PageNotFound from './pages/pageNotFound';
import PrivateRoute from './components/private-route';
import {AppRoute} from './const';
import {Route, Routes} from 'react-router-dom';
import HistoryRouter from './components/history-route';
import browserHistory from './browser-history';
import {useAppSelector} from './hooks';
import {useAppDispatch} from './hooks';
import {fetchOffersAction} from './store/thunks/offers';
import {checkAuthAction} from "./store/thunks/user";
import {userProcess} from "./store/slices/user/user";
import {getAuthorizationStatus} from './store/slices/user/selectors';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());
  }, []);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <Main/>
          }
        />
        {/*<Route*/}
        {/*  path={AppRoute.Login}*/}
        {/*  element={<Login />}*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path={AppRoute.Favorites}*/}
        {/*  element={*/}
        {/*    <PrivateRoute*/}
        {/*      authorizationStatus={authorizationStatus}*/}
        {/*    >*/}
        {/*      <Favorites/>*/}
        {/*    </PrivateRoute>*/}
        {/*  }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path={`${AppRoute.Offer}/:offerId`}*/}
        {/*  element={*/}
        {/*    <OfferPage*/}
        {/*      authorizationStatus={authorizationStatus}*/}
        {/*    />*/}
        {/*  }*/}
        {/*/>*/}
        <Route
          path="*"
          element={<PageNotFound type='page'/>}
        />
      </Routes>
    </HistoryRouter>
  );
}
