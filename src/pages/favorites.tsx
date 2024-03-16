import Container from '../components/container';
import Footer from '../components/footer';
import FavoriteLocation from '../components/favorite-location';
import {useAppSelector} from '../hooks';

export default function Favorites() {
  const offers = useAppSelector((state) => state.offers);
  return (
    <Container classMain="page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <FavoriteLocation location="Amsterdam" offers={offers} />
            <FavoriteLocation location="Cologne" offers={offers} />
          </ul>
        </section>
      </div>
      <Footer/>
    </Container>
  );
}
