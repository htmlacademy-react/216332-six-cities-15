import Main from './pages/main';
import Favorites from './pages/favorites';
import Login from './pages/login';
import Offer from './pages/offer';
import PageNotFound from './pages/pageNotFound';
import PrivateRoute from './components/private-route';
import {AppRoute, AuthorizationStatus} from './const';
import {Route, BrowserRouter, Routes} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main cards={Array.from({length:5}, () => '')} />}
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
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<Offer />}
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
