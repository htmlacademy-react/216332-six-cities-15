import {useState, ChangeEvent, FormEvent} from 'react';
import {useAppDispatch} from '../hooks';
import {MAX_CHARACTERS, RATING_OPTIONS} from '../const';
import {submitCommentAction} from '../store/thunks/comments';
import RatingOption from './rating-option';
import {MIN_CHARACTERS, MIN_RATING} from '../const';

type OfferFormProps = {
  id: string | undefined;
}

export default function OfferForm({id}: OfferFormProps) {
  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const dispatch = useAppDispatch();

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const {rating, review} = formData;
    dispatch(submitCommentAction(
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
        {RATING_OPTIONS.map((option) => (
          <RatingOption
            key={option.name}
            name={option.name}
            stars={option.stars}
            handleFieldChange={handleFieldChange}
            isChecked={isChecked}
          />
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        maxLength={MAX_CHARACTERS}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleFieldChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">{MIN_CHARACTERS} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            formData.review.length < MIN_CHARACTERS ||
            parseInt(formData.rating, 10) === MIN_RATING
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
}
