import {MouseEvent} from 'react';
import {OfferPreview} from '../types/offer-preview';
import {calculateRating} from '../helpers/calculateRating';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../hooks';
import {AppRoute} from '../const';
import {changeFavoriteOfferAction} from '../store/thunks/favorite';
import {updateOffers} from '../store/slices/offers/offers';
import {updateNearByOffers} from '../store/slices/nearBy/nearBy';
import {updateOffer} from '../store/slices/offer/offer';

type FavoriteCardProps = {
  offer: OfferPreview;
}

export default function FavoriteCard({offer}: FavoriteCardProps) {

  const {
    id,
    title,
    isFavorite,
    type,
    price,
    previewImage,
    isPremium,
    rating,
  } = offer;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickHandler = (e: MouseEvent<HTMLHeadingElement> | MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(`${AppRoute.Offer}/${id}`);
    if (window) {
      window.scrollTo({top: 0, left: 0});
    }
  };

  const onFavoriteClickHandler = (e: MouseEvent) => {
    e.preventDefault();

    dispatch(changeFavoriteOfferAction({id, status: Number(!isFavorite)}))
      .then(() => {
        dispatch(updateOffers(id));
        dispatch(updateNearByOffers(id));
        dispatch(updateOffer(id));
      });
  };

  return (
    <article className="favorites__card place-card">
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#" onClick={onClickHandler}>
          <img className="place-card__image" src={previewImage} width="150" height="110"
            alt="Place image"
          />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            onClick={onFavoriteClickHandler}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
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
