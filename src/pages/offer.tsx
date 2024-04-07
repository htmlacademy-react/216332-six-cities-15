import {useEffect, MouseEvent} from 'react';

import {useParams} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, CardType, RequestsStatus} from '../const';
import {useAppSelector} from '../hooks';
import {useAppDispatch} from '../hooks';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';

import Container from '../components/container/container';
import {calculateRating} from '../helpers/calculate-rating';
import OfferForm from '../components/offer-form/offer-form';
import ReviewsList from '../components/reviews-list/reviews-list';
import Map from '../components/map/map';
import PlacesList from '../components/places-list/places-list';
import Loader from '../components/loader/loader';
import HelmetComponent from '../components/helmet-component/helmet-component';
import {MAX_COMMENTS, MAX_NEAR_OFFERS} from '../const';

import {getAuthorizationStatus} from '../store/slices/user/selectors';
import {getOffer, getOfferStatus} from '../store/slices/offer/selectors';
import {getComments} from '../store/slices/comments/selectors';
import {getOffersNearBy} from '../store/slices/nearBy/selectors';

import {fetchNearByAction} from '../store/thunks/nearBy';
import {fetchCommentsAction} from '../store/thunks/comments';
import {fetchOfferAction} from '../store/thunks/offer';
import PageNotFound from './page-not-found';
import {changeFavoriteOfferAction} from '../store/thunks/favorite';
import {updateOffers} from '../store/slices/offers/offers';
import {updateNearByOffers} from '../store/slices/nearBy/nearBy';
import {updateOffer} from '../store/slices/offer/offer';

export default function OfferPage() {

  const {offerId} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const offerStatus = useAppSelector(getOfferStatus);
  const currentOffer = useAppSelector(getOffer);
  const comments = useAppSelector(getComments);
  const nearBy = useAppSelector(getOffersNearBy);
  const isAuthStatus = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

  useEffect(() => {
    Promise.all([
      dispatch(fetchNearByAction(offerId as string)),
      dispatch(fetchCommentsAction(offerId as string)),
      dispatch(fetchOfferAction(offerId as string))
    ]);
  }, [offerId, dispatch]);

  if (offerStatus === RequestsStatus.Loading) {
    return (
      <Loader/>
    );
  }

  const onFavoriteClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentOffer) {
      return;
    }

    if (!isAuthStatus) {
      return navigate(`${AppRoute.Login}`);
    }

    const {id, isFavorite} = currentOffer;

    dispatch(changeFavoriteOfferAction({id, status: Number(!isFavorite)}))
      .then(() => {
        dispatch(updateOffers(id));
        dispatch(updateNearByOffers(id));
        dispatch(updateOffer(id));
      });
  };

  if (offerStatus === RequestsStatus.Failed || !currentOffer) {
    return (
      <PageNotFound type="offer"/>
    );
  }

  return (
    <Container classMain="page__main--offer">
      <HelmetComponent title='6 cities: offer' description='This page provides detailed information about the current offer: "6 cities: offer".'/>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {currentOffer?.images && currentOffer.images.map((image: string) =>
              (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {
              currentOffer?.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {currentOffer?.title}
              </h1>
              <button
                type="button"
                className={classNames({
                  'offer__bookmark-button button': true,
                  'offer__bookmark-button--active': currentOffer.isFavorite,
                })}
                onClick={onFavoriteClickHandler}
              >
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: `${currentOffer?.rating ? calculateRating(currentOffer.rating) : null}`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{currentOffer?.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {currentOffer?.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {currentOffer?.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {currentOffer?.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{currentOffer?.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentOffer?.goods && currentOffer.goods.map((feature) => (
                  <li className="offer__inside-item" key={feature}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src={currentOffer.host ? currentOffer.host.avatarUrl : ''} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="offer__user-name">
                  {currentOffer?.host?.name}
                </span>
                <span className="offer__user-status">
                  {currentOffer?.host?.isPro && 'Pro'}
                </span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {currentOffer?.description}
                </p>
              </div>
            </div>
            <ReviewsList comments={[...comments].reverse().slice(0, MAX_COMMENTS)}>
              {
                authorizationStatus === AuthorizationStatus.Auth &&
                <OfferForm id={offerId}/>
              }
            </ReviewsList>
          </div>
        </div>
        {
          currentOffer &&
            <Map
              city={currentOffer.city}
              offers={[...nearBy.slice(0, MAX_NEAR_OFFERS), currentOffer]}
              selectedOffer={currentOffer}
              extraClass="offer__map"
            />
        }
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <PlacesList
            offers={[...nearBy.slice(0, 3)]}
            variant={CardType.NearPlaces}
            extraClass="near-places__list"
          />
        </section>
      </div>
    </Container>
  );
}
