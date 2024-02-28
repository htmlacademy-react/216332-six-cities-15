import {useState} from 'react';
import {Offer} from '../types/offer';
import PlaceCard from './place-card';

type PlacesListProps = {
  offers: Offer[];
}

export default function PlacesList({offers}: PlacesListProps) {
  const [activeOffer, setActiveOffer] = useState('');

  const onMouseEnterHandler = (id: string) => {
    setActiveOffer(id);
  };

  const onMouseLeaveHandler = () => {
    setActiveOffer('');
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
