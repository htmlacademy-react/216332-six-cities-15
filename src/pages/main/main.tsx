import {useState} from 'react';
import Container from '../../components/container/container';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import Tabs from '../../components/tabs/tabs';
import Loader from '../../components/loader/loader';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import HelmetComponent from '../../components/helmet-component/helmet-component';

import {SORT_OPTIONS, CardType} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setCity} from '../../store/slices/cities/cities';
import {setActiveId} from '../../store/slices/offers/offers';
import {sortOffers} from '../../helpers/sort-offers';
import {
  getActiveOffer, getErrorStatus,
  getFilteredOffers,
  getOffersDataLoadingStatus
} from '../../store/slices/offers/selectors';
import {getCities, getCurrentCity} from '../../store/slices/cities/selectors';
import classNames from 'classnames';
import EmptyOffers from '../../components/empty-offers/empty-offers';
import {Offer} from '../../types/offer';

export default function Main() {
  const [activeSort, setActiveSort] = useState(SORT_OPTIONS.popular);

  const cities = useAppSelector(getCities);
  const currentOffer = useAppSelector(getActiveOffer);
  const currentCity = useAppSelector(getCurrentCity);
  const filteredOffers = useAppSelector(getFilteredOffers);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const hasErrors = useAppSelector(getErrorStatus);
  const dispatch = useAppDispatch();

  const onMouseEnterHandler = (id: string) => {
    dispatch(setActiveId(id));
  };

  const onMouseLeaveHandler = () => {
    dispatch(setActiveId(null));
  };

  const selectedCityHandler = (city : string) => {
    dispatch(setCity(city));
  };

  const onChangeSortHandler = (data: string): void => {
    setActiveSort(data);
  };

  const sortedOffers: Offer[] = sortOffers(filteredOffers, activeSort);

  return (

    <Container
      extraClass={classNames({
        'page--gray': !hasErrors,
        'page__main--index-empty': hasErrors || (sortedOffers.length === 0 && !isOffersDataLoading),
      })}
      classMain=" page--main page__main--index"
    >
      <HelmetComponent title='6 cities' description='This page showcases various offers available on the platform.'/>
      <h1 className="visually-hidden">Cities</h1>
      {
        currentCity &&
          <Tabs
            onSelectedCity={selectedCityHandler}
            city={currentCity}
            cities={cities}
          />
      }
      <div className="cities">
        <div
          className={classNames({
            'cities__places-container container': true,
            'cities__places-container--empty': hasErrors || (sortedOffers.length === 0 && !isOffersDataLoading)
          })}
        >
          {
            (hasErrors || (sortedOffers.length === 0 && !isOffersDataLoading)) ?
              <EmptyOffers city={currentCity ? currentCity.name : ''} /> :
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>

                <b className="places__found">
                  {filteredOffers.length} {filteredOffers.length <= 1 ? 'place' : 'places'} to stay in {currentCity?.name}
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
          }
          <div className="cities__right-section">
            {
              (
                !hasErrors &&
                (sortedOffers.length > 0 && !isOffersDataLoading) &&
                currentCity &&
                currentOffer !== undefined
              ) &&
              <Map
                city={currentCity}
                offers={filteredOffers}
                selectedOffer={currentOffer}
                extraClass="cities__map"
              />
            }
          </div>
        </div>
      </div>
    </Container>
  );
}
