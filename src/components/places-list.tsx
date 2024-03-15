import {Offer} from '../types/offer';
import PlaceCard from './place-card';
import {CardType} from '../const';

type PlacesListProps = {
  offers: Offer[];
  extraClass?: string;
  variant: CardType;
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
}

export default function PlacesList(
  {
    offers,
    variant,
    extraClass,
    onMouseEnter,
    onMouseLeave,
  }: PlacesListProps) {

  const onMouseEnterHandler = (id: string) => {
    onMouseEnter?.(id);
  };

  const onMouseLeaveHandler = () => {
    onMouseLeave?.('');
  };

  return (
    <div className={`places__list ${extraClass ? extraClass : ''}`}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={variant}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        />
      ))}
    </div>
  );
}
