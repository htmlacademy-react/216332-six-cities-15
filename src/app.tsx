import Main from './pages/main';
import Favorites from './pages/favorites';
import Login from './pages/login';
import Offer from './pages/offer';
import PageNotFound from './pages/pageNotFound';
import {AppRoute} from './const';
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
          element={<Favorites />}
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
