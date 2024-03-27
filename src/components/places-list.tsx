import PlaceCard from './place-card';
import {CardType} from '../const';
import {OfferPreview} from '../types/offer-preview';

type PlacesListProps = {
  offers: OfferPreview[];
  extraClass?: string;
  variant: CardType;
  onMouseEnter: (id?: string) => void;
  onMouseLeave: () => void;
}

export default function PlacesList(
  {
    offers,
    variant,
    extraClass,
    onMouseEnter,
    onMouseLeave,
  }: PlacesListProps) {

  return (
    <div className={`places__list ${extraClass ? extraClass : ''}`}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={variant}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </div>
  );
}
