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
import {CitiesType} from './const';
import {City} from './types/city';
import {Comment} from './types/comment';

type AppProps = {
  offers: Offer[];
  comments: Comment[];
  cities: City[];
}

export default function App({offers, cities, comments}: AppProps) {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>(CitiesType.Amsterdam);

  const onMouseEnterHandler = (id: string) => {
    const currentOffer = offers.find((offer) => offer.id === id);

    setSelectedOffer(currentOffer);
  };

  const currentCity: City = cities.find((city) => city.name === selectedCity);
  const filteredOffers: Offer[] | [] = offers.filter((offer: Offer) => offer.city.name === selectedCity);

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
              offers={filteredOffers}
              cities={cities}
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
          element={
            <OfferPage
              offers={filteredOffers}
              comments={comments}
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
