import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {RatingStarsCount} from "../../common/const.js";
import {ClassNames} from "../../common/const.js";


const ReviewForm = (props) => {
  const {ButtonClassNames} = ClassNames;
  const {
    comment,
    rating,
    buttonText,
    isDisabled,
    onSubmit,
    onCommentChange,
    onRatingChange,
    errorMessage,
  } = props;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        onSubmit();
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">

        {Object.values(RatingStarsCount).map((item, i, array) => {
          const count = array.length - i;

          return (
            <Fragment key={item + i}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={`${count}`}
                id={`${count}-stars`}
                type="radio"
                checked={count === rating}
                onChange={(evt) => {
                  let value = parseInt(evt.target.value, 10);
                  onRatingChange(value);
                }}
              />
              <label htmlFor={`${count}-stars`} className="reviews__rating-label form__rating-label" title={item}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>
          );
        })}

      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={(evt) => {
          onCommentChange(evt.target.value);
        }}
      />
      <div className="reviews__button-wrapper">

        {errorMessage
          ? <p className="reviews__help" style={{color: `red`}}>{errorMessage}</p>
          : <p className="reviews__help">
              To submit review please make sure to set
            <span className="reviews__star">rating</span>
              and describe your stay with at least
            <b className="reviews__text-amount">50 characters</b>.
          </p>
        }

        <button
          key={ButtonClassNames.REVIEW}
          className={ButtonClassNames.REVIEW}
          disabled={isDisabled}
          type="submit"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  rating: PropTypes.any,
  comment: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default ReviewForm;
