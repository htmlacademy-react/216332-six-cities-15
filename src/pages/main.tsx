import {useState} from 'react';
import Container from '../components/container';
import PlacesList from '../components/places-list';
import Map from '../components/map';
import Tabs from '../components/tabs';
import Loader from '../components/loader';
import PlacesSorting from '../components/places-sorting';

import {SORT_OPTIONS, CardType, CitiesType} from '../const';
import {City} from '../types/city';
import {useAppDispatch, useAppSelector} from '../hooks';
import {setCity} from '../store/slices/cities/cities';
import {setActiveId} from '../store/slices/offers/offers';
import {sortOffers} from '../helpers/sortOffers';
import {Offer} from '../types/offer';
import {getActiveOffer, getOffers, getOffersDataLoadingStatus} from '../store/slices/offers/selectors';
import {getActiveCity, getCities} from '../store/slices/cities/selectors';

export default function Main() {
  const [activeSort, setActiveSort] = useState(SORT_OPTIONS.popular);
  const offers = useAppSelector(getOffers);
  const cities = useAppSelector(getCities);
  const currentOffer = useAppSelector(getActiveOffer);
  const selectedCity = useAppSelector(getActiveCity);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const dispatch = useAppDispatch();

  const onMouseEnterHandler = (id: string) => {
    dispatch(setActiveId(id));
  };

  const onMouseLeaveHandler = () => {
    dispatch(setActiveId(null));
  };

  const selectedCityHandler = (city : CitiesType) => {
    dispatch(setCity(city));
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
            <b className="places__found">
              {filteredOffers.length} {filteredOffers.length <= 1 ? 'place' : 'places'} to stay in {currentCity.name}
            </b>
            <PlacesSorting
              active={activeSort}
              onChangeSort={onChangeSortHandler}
            />
            {
              isOffersDataLoading ?
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
