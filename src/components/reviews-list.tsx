import {Comment} from '../types/comment';
import ReviewsItem from './reviews-item';

type ReviewsListProps = {
  comments: Comment[];
  children?: JSX.Element | false;
}

export default function ReviewsList({comments, children}: ReviewsListProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{comments.length}</span>
      </h2>
      {
        comments?.length > 0 && (
          <ul className="reviews__list">
            {comments.map((comment) => <ReviewsItem key={comment.offerId} comment={comment}/>)}
          </ul>
        )
      }
      {children}
    </section>
  );
}
