import React from "react";
import reviewPropTypes from "../../prop-types/review-prop-types.js";


const ReviewItem = (props) => {
  const {review} = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.userAvatar} width="54" height="54" alt={review.userName} />
        </div>
        <span className="reviews__user-name">
          {review.userName}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `80%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.description}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{review.dateTime}</time>
      </div>
    </li>
  );
};

ReviewItem.propTypes = {
  review: reviewPropTypes,
};

export default ReviewItem;
