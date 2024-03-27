import Container from '../components/container';
import {Offer} from '../types/offer';
import {useParams} from 'react-router-dom';
import {calculateRating} from '../helpers/calculateRating';
import OfferForm from '../components/offer-form';
import {AuthorizationStatus, CardType} from '../const';
import ReviewsList from '../components/reviews-list';
import Map from '../components/map';
import PlacesList from '../components/places-list';
import {useAppSelector} from '../hooks';
import {useAppDispatch} from '../hooks';
import {useEffect} from 'react';
import {fetchOfferDataAction} from '../store/api-actions';
import Loader from '../components/loader';

type OfferPageProps = {
  authorizationStatus: AuthorizationStatus;
}

export default function OfferPage(
  {
    authorizationStatus,
  } : OfferPageProps) {

  const {offerId} = useParams();
  const comments = useAppSelector((state) => state.comments);
  const nearBy = useAppSelector((state) => state.nearBy);
  const isOfferDataLoading: boolean = useAppSelector((state) => state.isOfferDataLoading);
  const currentOffer: Offer = useAppSelector((state) => state.currentOffer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferDataAction({id: offerId} as string));
  }, [offerId]);

  return (
    <Container classMain="page__main--offer">
      {
        isOfferDataLoading ?
          <Loader/> :
          <>
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
                    <button className="offer__bookmark-button button" type="button">
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
                  <ReviewsList comments={comments}>
                    {
                      authorizationStatus === AuthorizationStatus.Auth &&
                      <OfferForm id={offerId}/>
                    }
                  </ReviewsList>
                </div>
              </div>
              <Map
                city={currentOffer.city}
                offers={[...nearBy.slice(0, 3), currentOffer]}
                selectedOffer={currentOffer}
                extraClass="offer__map"
              />
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
          </>
      }
    </Container>
  );
}
