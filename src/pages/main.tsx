import {useState} from 'react';
import Container from '../components/container';
import PlacesList from '../components/places-list';
import Map from '../components/map';
import Tabs from '../components/tabs';
import Loader from '../components/loader';
import PlacesSorting from '../components/places-sorting';

import {SORT_OPTIONS, CardType, CitiesType} from '../const';
import {useAppDispatch, useAppSelector} from '../hooks';
import {setCity} from '../store/slices/cities/cities';
import {setActiveId} from '../store/slices/offers/offers';
import {sortOffers} from '../helpers/sortOffers';
import {
  getActiveOffer,
  getFilteredOffers,
  getOffersDataLoadingStatus
} from '../store/slices/offers/selectors';
import {getCities, getCurrentCity} from '../store/slices/cities/selectors';

export default function Main() {
  const [activeSort, setActiveSort] = useState(SORT_OPTIONS.popular);

  const cities = useAppSelector(getCities);
  const currentOffer = useAppSelector(getActiveOffer);
  const currentCity = useAppSelector(getCurrentCity);
  const filteredOffers = useAppSelector(getFilteredOffers);
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
