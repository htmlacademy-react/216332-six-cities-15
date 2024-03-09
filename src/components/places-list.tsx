import {Offer} from '../types/offer';
import PlaceCard from './place-card';

type PlacesListProps = {
  offers: Offer[];
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
}

export default function PlacesList({offers, onMouseEnter, onMouseLeave}: PlacesListProps) {

  const onMouseEnterHandler = (id: string) => {
    onMouseEnter(id);
  };

  const onMouseLeaveHandler = () => {
    onMouseLeave('');
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        />
      ))}
    </div>
  );
}
