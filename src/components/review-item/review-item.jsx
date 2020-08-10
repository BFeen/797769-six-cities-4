import React from "react";
import reviewPropTypes from "../../prop-types/review-prop-types.js";
import {formatDate, getRatingStars} from "../../common/utils.js";


const ReviewItem = (props) => {
  const {review} = props;
  const {user, rating} = review;
  const slicedDate = review.dateTime.slice(0, 10);
  const dateReview = formatDate(review.dateTime);
  const ratingStarsLength = getRatingStars(rating);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatar}
            width="54" height="54"
            alt={`Photo ${user.name}`}
          />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: ratingStarsLength}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time
          className="reviews__time"
          dateTime={slicedDate}
        >{dateReview}</time>
      </div>
    </li>
  );
};

ReviewItem.propTypes = {
  review: reviewPropTypes,
};

export default ReviewItem;
