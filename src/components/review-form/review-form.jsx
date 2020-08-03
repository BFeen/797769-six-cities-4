import React, {Fragment, PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {RatingStarsCount} from "../../common/const.js";


class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);

    this._formRef = createRef();
  }

  render() {
    const {onSubmit, offerId} = this.props;

    return (
      <form
        className="reviews__form form"
        action="#"
        method="post"
        ref={this._formRef}
        onSubmit={(evt) => {
          evt.preventDefault();

          const formData = new FormData(this._formRef.current);
          const review = {
            rating: formData.get(`rating`),
            comment: formData.get(`review`),
          };

          onSubmit(offerId, review);
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
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set
            <span className="reviews__star">rating</span>
            and describe your stay with at least
            <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  offerId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReviewForm;
