import {useState} from 'react';
import Main from './pages/main';
import Favorites from './pages/favorites';
import Login from './pages/login';
import OfferPage from './pages/offer';
import PageNotFound from './pages/pageNotFound';
import PrivateRoute from './components/private-route';
import {Offer} from './types/offer';
import {AppRoute, AuthorizationStatus} from './const';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {Cities} from './const';
import {cities} from './mocks/cities';
import {City} from './types/city';

type AppProps = {
  offers: Offer[];
}

export default function App({offers}: AppProps) {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>(Cities.Amsterdam);

  const onMouseEnterHandler = (id: string) => {
    const currentOffer = offers.find((offer) => offer.id === id);

    setSelectedOffer(currentOffer);
  };

  const currentCity: City = cities.find((city) => city.name === selectedCity);

  const onMouseLeaveHandler = () => {
    setSelectedOffer(null);
  };

  const selectedCityHandler = (city : string) => {
    setSelectedCity(city);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <Main
              offers={offers}
              selectedOffer={selectedOffer}
              city={currentCity}
              onMouseEnter={onMouseEnterHandler}
              onMouseLeave={onMouseLeaveHandler}
              onSelectedCity={selectedCityHandler}
            />
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
          element={<OfferPage offers={offers}/>}
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
