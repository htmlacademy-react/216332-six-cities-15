import Container from '../components/container';
import PlacesList from '../components/places-list';
import Map from '../components/map';
import Tabs from '../components/tabs';
import PlacesSorting from '../components/places-sorting';

import {Offer} from '../types/offer';
import {CardType} from '../const';
import {City} from '../types/city';
import {useState} from 'react';
import {cities} from '../mocks/cities';
import {useAppDispatch, useAppSelector} from '../hooks';
import {setCity, filterCity} from '../store/action';

export default function Main() {

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const offers = useAppSelector((state) => state.offers);
  const selectedCity: string = useAppSelector((state) => state.selectedCity);
  const dispatch = useAppDispatch();

  const onMouseEnterHandler = (id: string) => {
    const currentOffer = offers.find((offer) => offer.id === id);

    setSelectedOffer(currentOffer);
  };

  const onMouseLeaveHandler = () => {
    setSelectedOffer(null);
  };

  const selectedCityHandler = (city : string) => {
    dispatch(setCity({selectedCity: city}));
    dispatch(filterCity());
  };

  const currentCity: City = cities.find((city) => city.name === selectedCity);

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
            <b className="places__found">{offers.length} places to stay in {currentCity.name}</b>
            <PlacesSorting/>
            <PlacesList
              offers={offers}
              variant={CardType.Cities}
              extraClass="cities__places-list tabs__content"
              onMouseEnter={onMouseEnterHandler}
              onMouseLeave={onMouseLeaveHandler}
            />
          </section>
          <div className="cities__right-section">
            <Map
              city={currentCity}
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
