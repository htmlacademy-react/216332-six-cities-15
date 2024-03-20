import {useState} from 'react';
import Container from '../components/container';
import PlacesList from '../components/places-list';
import Map from '../components/map';
import Tabs from '../components/tabs';
import Loader from '../components/loader';
import PlacesSorting from '../components/places-sorting';

import {SORT_OPTIONS, CardType, AuthorizationStatus} from '../const';
import {City} from '../types/city';
import {useAppDispatch, useAppSelector} from '../hooks';
import {setCity, selectOffer, resetOffer} from '../store/action';
import {sortOffers} from '../helpers/sortOffers';
import {Offer} from '../types/offer';

export default function Main() {
  const [activeSort, setActiveSort] = useState(SORT_OPTIONS.popular);
  const cities = useAppSelector((state) => state.cities);
  const offers = useAppSelector((state) => state.offers);
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const selectedCity: string = useAppSelector((state) => state.selectedCity);
  const authorizationStatus: AuthorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading: boolean = useAppSelector((state) => state.isOffersDataLoading);
  const dispatch = useAppDispatch();

  const onMouseEnterHandler = (id: string) => {
    dispatch(selectOffer({id}));
  };

  const onMouseLeaveHandler = () => {
    dispatch(resetOffer());
  };

  const selectedCityHandler = (city : string) => {
    dispatch(setCity({selectedCity: city}));
  };

  const onChangeSortHandler = (data: string): void => {
    setActiveSort(data);
  };

  const currentCity: City = cities.find((city) => city.name === selectedCity);

  const filteredOffers = offers.filter((offer: Offer) => offer.city.name === selectedCity);

  const sortedOffers = sortOffers(filteredOffers, activeSort);

  return (
    <Container extraClass="page--gray page--main" classMain="page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <Tabs
        onSelectedCity={selectedCityHandler}
        city={currentCity}
        cities={cities}
      />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{filteredOffers.length} {filteredOffers.length <= 1 ? 'place' : 'places'} to stay in {currentCity.name}</b>
            <PlacesSorting
              active={activeSort}
              onChangeSort={onChangeSortHandler}
            />
            {
              (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) ?
                <Loader /> :
                <PlacesList
                  offers={sortedOffers}
                  variant={CardType.Cities}
                  extraClass="cities__places-list tabs__content"
                  onMouseEnter={onMouseEnterHandler}
                  onMouseLeave={onMouseLeaveHandler}
                />
            }
          </section>
          <div className="cities__right-section">
            <Map
              city={currentCity}
              offers={filteredOffers}
              selectedOffer={currentOffer}
              extraClass="cities__map"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
