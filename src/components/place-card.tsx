import {OfferPreview} from '../types/offer-preview';
import {calculateRating} from '../helpers/calculateRating';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../hooks';
import {useAppDispatch} from '../hooks';
import {AppRoute, AuthorizationStatus} from '../const';
import {CardType} from '../const';
import classNames from 'classnames';
import {getAuthorizationStatus} from '../store/slices/user/selectors';
import {changeFavoriteOfferAction} from '../store/thunks/favorite';
import {updateOffers} from '../store/slices/offers/offers';
import {updateNearByOffers} from '../store/slices/nearBy/nearBy';
import {updateOffer} from '../store/slices/offer/offer';

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
    isFavorite,
    rating,
  } = offer;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthStatus = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

  const onClickHandler = (e: MouseEvent) => {
    e.preventDefault();
    navigate(`${AppRoute.Offer}/${id}`);
    if (window) {
      window.scrollTo({top: 0, left: 0});
    }
  };

  const onFavoriteClickHandler = (e: MouseEvent) => {
    e.preventDefault();

    if (!isAuthStatus) {
      return navigate(`${AppRoute.Login}`);
    }

    dispatch(changeFavoriteOfferAction({id, status: Number(!isFavorite)}))
      .then(() => {
        dispatch(updateOffers(id));
        dispatch(updateNearByOffers(id));
        dispatch(updateOffer(id));
      });
  };

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
        <a href="#" onClick={onClickHandler}>
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
          <button
            className={classNames({
              'place-card__bookmark-button button': true,
              'place-card__bookmark-button--active': isFavorite,
            })}
            onClick={onFavoriteClickHandler}
          >
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
        <h2 className="place-card__name" onClick={onClickHandler}>
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
