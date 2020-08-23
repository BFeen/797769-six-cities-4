import * as React from "react";
import {ClassNames, RatingStarsCount} from "../../common/const";


interface Props {
  rating: any,
  comment: string;
  buttonText: string;
  isDisabled: boolean;
  errorMessage: string;
  onSubmit: () => void;
  onCommentChange: (review: string) => void;
  onRatingChange: (value: number) => void;
};

type RatingStars = {
  [key: string]: string;
}


const ReviewForm: React.FunctionComponent<Props> = (props) => {
  const {ButtonClassNames} = ClassNames;
  const ratingStarsCount: RatingStars = Object.assign({}, RatingStarsCount);
  const {
    comment,
    rating,
    buttonText,
    isDisabled,
    errorMessage,
    onSubmit,
    onCommentChange,
    onRatingChange,
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

        {Object.values(ratingStarsCount).map((item, i, array) => {
          const count = array.length - i;

          return (
            <React.Fragment key={item + i}>
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
            </React.Fragment>
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

export default ReviewForm;
