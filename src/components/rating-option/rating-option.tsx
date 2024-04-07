import {ChangeEvent} from 'react';

type RatingOptionProps = {
  name: string;
  stars: string;
  handleFieldChange: (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  isChecked: (stars: string) => boolean;
}

export default function RatingOption({name, stars, handleFieldChange, isChecked}: RatingOptionProps) {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={stars}
        id={`${stars}-stars`}
        type="radio"
        onChange={handleFieldChange}
        checked={isChecked(stars)}
      />
      <label htmlFor={`${stars}-stars`} className="reviews__rating-label form__rating-label" title={name}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}
