import Container from '../components/container';
import FavoriteLocation from '../components/favorite-location';
import {useAppSelector} from '../hooks';
import {getFavoriteOffers} from '../store/slices/favorite/selectors';
import {Offer} from '../types/offer';
import EmptyFavoriteOffers from '../components/empty-favorite-offers';
import classNames from 'classnames';

type FilteredDataType = {
  city: string;
  offers: Offer[];
};

const createMap = (data: Offer[]): FilteredDataType[] | [] => {
  const map = new Map<string, Offer[]>();
  const res: FilteredDataType[] = [];
  data.forEach((el, i, arr) => {
    map.set(el.city.name, [...(map.get(el.city.name) || []), ...[arr[i]]]);
  });

  map.forEach((value, key) => {
    res.push({city: key, offers: value});
  });

  return res;
};

export default function Favorites() {
  const offers = useAppSelector(getFavoriteOffers);
  const preparedData = createMap(offers);
  return (
    <Container
      extraClass='page--favorites-empty'
      classMain={classNames({
        'page__main--favorites': true,
        'page__main--favorites-empty': offers.length === 0,
      })}
      hasFooter
    >
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
