import {Comment} from '../types/comment';
import {calculateRating} from '../helpers/calculateRating';
import {formatTime} from '../helpers/dataFomrater';

type ReviewsItemProps = {
  comment: Comment;
}

export default function ReviewsItem({comment} : ReviewsItemProps) {
  const {
    comment: userComment,
    date,
    rating,
    user : {
      name,
      avatarUrl,
    },
  } = comment;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${calculateRating(rating)}`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {userComment}
        </p>
        <time
          className="reviews__time"
          dateTime={date && formatTime(date,'number')}
        >
          {date && formatTime(date, 'string')}
        </time>
      </div>
    </li>
  );
}
