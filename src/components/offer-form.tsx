import {useState, ChangeEvent, FormEvent} from 'react';
import {useAppDispatch} from '../hooks';
import {submitOfferCommentAction} from '../store/api-actions';

type OfferFormProps = {
  id: string;
}

export default function OfferForm({id}: OfferFormProps) {
  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const dispatch = useAppDispatch();

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const {rating, review} = formData;
    dispatch(submitOfferCommentAction(
      {
        id,
        rating: parseInt(rating, 10),
        comment: review
      }
    ));
    setFormData({rating: '', review: ''});
  };

  const isChecked = (value: string): boolean => value === formData.rating;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          onChange={handleFieldChange}
          checked={isChecked('5')}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          onChange={handleFieldChange}
          checked={isChecked('4')}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          onChange={handleFieldChange}
          checked={isChecked('3')}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          onChange={handleFieldChange}
          checked={isChecked('2')}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-stars"
          type="radio"
          onChange={handleFieldChange}
          checked={isChecked('1')}
        />
        <label htmlFor="1-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleFieldChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={formData.review.length < 50 || formData.rating === 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
