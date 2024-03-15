import Main from './pages/main';
import Favorites from './pages/favorites';
import Login from './pages/login';
import OfferPage from './pages/offer';
import PageNotFound from './pages/pageNotFound';
import PrivateRoute from './components/private-route';
import {Offer} from './types/offer';
import {AppRoute, AuthorizationStatus} from './const';
import {Route, BrowserRouter, Routes} from 'react-router-dom';

type AppProps = {
  offers: Offer[];
}

export default function App({offers}: AppProps) {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <Main/>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <Favorites offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:offerId`}
          element={
            <OfferPage
              offers={offers}
              authorizationStatus={AuthorizationStatus.NoAuth}
            />
          }
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
