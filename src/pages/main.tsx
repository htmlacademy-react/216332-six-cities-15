import Container from '../components/container';
import PlacesList from '../components/places-list';
import Map from '../components/map';
import Tabs from '../components/tabs';
import PlacesSorting from '../components/places-sorting';

import {Offer} from '../types/offer';
import {CardType} from '../const';
import {City} from '../types/city';

type MainProps = {
  offers: Offer[];
  city: City;
  cities: City[];
  selectedOffer: Offer | null;
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
  onSelectedCity: (name: string) => void;
}

export default function Main(
  {
    offers,
    city,
    cities,
    selectedOffer,
    onSelectedCity,
    onMouseEnter,
    onMouseLeave
  }: MainProps) {

  return (
    <Container extraClass="page--gray page--main" classMain="page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <Tabs
        cities={cities}
        onSelectedCity={onSelectedCity}
        city={city}
      />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {city.name}</b>
            <PlacesSorting/>
            <PlacesList
              offers={offers}
              variant={CardType.Cities}
              extraClass="cities__places-list tabs__content"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          </section>
          <div className="cities__right-section">
            <Map
              city={city}
              offers={offers}
              selectedOffer={selectedOffer}
              extraClass="cities__map"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
