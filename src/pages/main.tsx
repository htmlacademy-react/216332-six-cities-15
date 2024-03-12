import Container from '../components/container';
import PlacesList from '../components/places-list';
import Map from '../components/map';
import Tabs from '../components/tabs';
import PlacesSorting from '../components/places-sorting';

import {Offer} from '../types/offer';
import {CardType, CitiesType} from '../const';
import {City} from '../types/city';
import {useState} from 'react';
import {cities} from '../mocks/cities';

type MainProps = {
  offers: Offer[];
}

export default function Main(
  {
    offers,
  }: MainProps) {

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>(CitiesType.Amsterdam);

  const onMouseEnterHandler = (id: string) => {
    const currentOffer = offers.find((offer) => offer.id === id);

    setSelectedOffer(currentOffer);
  };

  const onMouseLeaveHandler = () => {
    setSelectedOffer(null);
  };

  const selectedCityHandler = (city : string) => {
    setSelectedCity(city);
  };

  const currentCity: City = cities.find((city) => city.name === selectedCity);
  const filteredOffers: Offer[] | [] = offers.filter((offer: Offer) => offer.city.name === selectedCity);

  return (
    <Container extraClass="page--gray page--main" classMain="page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <Tabs
        cities={cities}
        onSelectedCity={selectedCityHandler}
        city={currentCity}
      />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{filteredOffers.length} places to stay in {currentCity.name}</b>
            <PlacesSorting/>
            <PlacesList
              offers={filteredOffers}
              variant={CardType.Cities}
              extraClass="cities__places-list tabs__content"
              onMouseEnter={onMouseEnterHandler}
              onMouseLeave={onMouseLeaveHandler}
            />
          </section>
          <div className="cities__right-section">
            <Map
              city={currentCity}
              offers={filteredOffers}
              selectedOffer={selectedOffer}
              extraClass="cities__map"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
