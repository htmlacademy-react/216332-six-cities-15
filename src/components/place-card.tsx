import {OfferPreview} from '../types/offer-preview';
import {calculateRating} from '../helpers/calculateRating';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../const';
import {CardType} from '../const';
import classNames from 'classnames';

type PlaceCardProps = {
  offer: OfferPreview;
  variant: CardType;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

const NORMAL_WIDTH = 260;
const SMALL_WIDTH = 150;
const NORMAL_HEIGHT = 200;
const SMALL_HEIGHT = 110;

export default function PlaceCard(
  {
    offer,
    variant,
    onMouseEnter,
    onMouseLeave,
  }: PlaceCardProps) {

  const {
    id,
    title,
    type,
    price,
    previewImage,
    isPremium,
    rating,
  } = offer;

  const navigate = useNavigate();

  return (
    <article
      className={classNames({
        'place-card': true,
        'cities__card': CardType.Cities === variant,
        'favorites__card': CardType.Favorites === variant,
        'near-places__card': CardType.NearPlaces === variant,
      })}
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={() => onMouseLeave()}
      onClick={(e) => {
        e.preventDefault();
        navigate(`${AppRoute.Offer}/${id}`);
        if (window) {
          window.scrollTo({top: 0, left: 0});
        }
      }}
    >
      {
        isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
      }
      <div
        className={classNames({
          'place-card__image-wrapper': true,
          'cities__image-wrapper': CardType.Cities === variant,
          'favorites__image-wrapper': CardType.Favorites === variant,
          'near-places__image-wrapper': CardType.NearPlaces === variant,
        })}
      >
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={CardType.Favorites === variant ? SMALL_WIDTH : NORMAL_WIDTH}
            height={CardType.Favorites === variant ? SMALL_HEIGHT : NORMAL_HEIGHT}
            alt="Place image"
          />
        </a>
      </div>
      <div className={classNames({
        'place-card__info': true,
        'favorites__card-info': CardType.Favorites === variant,
      })}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${calculateRating(rating)}`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
