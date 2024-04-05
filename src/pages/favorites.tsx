import Container from '../components/container';
import FavoriteLocation from '../components/favorite-location';
import {useAppSelector} from '../hooks';
import {getFavoriteOffers} from '../store/slices/favorite/selectors';
import EmptyFavoriteOffers from '../components/empty-favorite-offers';
import HelmetComponent from '../components/helmet-component';
import classNames from 'classnames';
import {useMemo} from 'react';
import {preparedFavoriteData} from '../helpers/preparedFavoriteData';

export default function Favorites() {
  const offers = useAppSelector(getFavoriteOffers);
  const preparedData = useMemo(() => preparedFavoriteData(offers), [offers]);

  return (
    <Container
      extraClass={classNames({
        'page--favorites-empty': offers.length === 0,
      })}
      classMain={classNames({
        'page__main--favorites': true,
        'page__main--favorites-empty': offers.length === 0,
      })}
      hasFooter
    >
      <HelmetComponent
        title='6 cities: favorites'
        description="This page displays a user's favorite offers, providing easy access to preferred content."
      />
      <div className="page__favorites-container container">
        {
          offers.length > 0 ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {preparedData.map((item) =>
                  (
                    <FavoriteLocation
                      key={item?.city}
                      location={item?.city}
                      offers={item?.offers}
                    />
                  )
                )}
              </ul>
            </section> :
            <EmptyFavoriteOffers/>
        }
      </div>
    </Container>
  );
}
