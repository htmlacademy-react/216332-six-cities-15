import {Offer} from '../../types/offer';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoriteLocationProps = {
  offers: Offer[];
  location: string;
}

export default function FavoriteLocation({offers, location}: FavoriteLocationProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{location}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavoriteCard
            key={offer.id}
            offer={offer}
          />
        ))}
      </div>
    </li>
  );
}
