import Container from '../components/container';
import {Offer} from '../types/offer';
import {useParams} from 'react-router-dom';
import {calculateRating} from '../helpers/calculateRating';
import OfferForm from '../components/offer-form';
import {AuthorizationStatus, CardType} from '../const';
import ReviewsList from '../components/reviews-list';
import {Comment} from '../types/comment';
import Map from '../components/map';
import PlacesList from '../components/places-list';
import {filterOffers} from '../helpers/filterOffers';
import {comments} from '../mocks/comments';

type OfferPageProps = {
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
}

export default function OfferPage(
  {
    offers,
    authorizationStatus,
  } : OfferPageProps) {

  const {offerId} = useParams();
  const currentOffer: Offer = offers.find((offer : Offer): boolean => offer?.id === offerId);
  const actualComments: Comment[] = comments.filter((comment : Comment): boolean => comment?.offerId === offerId);
  const nearOffer = filterOffers(offers, currentOffer);

  const {
    title,
    type,
    price,
    description,
    bedrooms,
    isPremium,
    maxAdults,
    rating,
    goods,
    images,
  } = currentOffer;

  return (
    <Container classMain="page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {images.map((image: string) =>
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
              isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {title}
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
                <span style={{width: `${calculateRating(rating)}`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {goods.map((feature) => (
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
                  <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">
                    Angelina
                </span>
                <span className="offer__user-status">
                    Pro
                </span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {description}
                </p>
              </div>
            </div>
            <ReviewsList comments={actualComments}>
              {
                authorizationStatus === AuthorizationStatus.Auth &&
                <OfferForm/>
              }
            </ReviewsList>
          </div>
        </div>
        <Map
          city={currentOffer.city}
          offers={[...nearOffer, currentOffer]}
          selectedOffer={currentOffer}
          extraClass="offer__map"
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <PlacesList
            offers={nearOffer}
            variant={CardType.NearPlaces}
            extraClass="near-places__list"
          />
        </section>
      </div>
    </Container>
  );
}
