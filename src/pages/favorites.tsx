import Container from '../components/container';
import Footer from '../components/footer';
import FavoriteLocation from '../components/favorite-location';
import FavoriteCard from '../components/favorite-card';


export default function Favorites() {
  return (
    <Container classMain="page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <FavoriteLocation location="Amsterdam">
              <FavoriteCard/>
              <FavoriteCard/>
            </FavoriteLocation>

            <FavoriteLocation location="Cologne">
              <FavoriteCard/>
              <FavoriteCard/>
            </FavoriteLocation>
          </ul>
        </section>
      </div>
      <Footer/>
    </Container>
  );
}
