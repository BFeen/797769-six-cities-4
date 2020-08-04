import React, {Fragment, PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import Button from "../button/button.jsx";
import {RatingStarsCount} from "../../common/const.js";
import {ClassNames} from "../../common/const.js";


const CharsAmount = {
  MIN: 50,
  MAX: 300,
};

const ButtonText = {
  SUBMIT: `Submit`,
  SENDING: `Sending`,
}

class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);

    this._formRef = createRef();

    this._handleSubmit = this._handleSubmit.bind(this);

    this.state = {
      isDisabled: true,
      rating: null,
      comment: ``,
      buttonText: ButtonText.SUBMIT
    };
  }
  
  componentDidMount() {
    console.log(`i was mounted!`)
  }

  componentDidUpdate() {
    const isValid = this._formValidation();

    this._buttonDisabling(isValid);
  }

  _buttonDisabling(isValid) {
    const {isDisabled} = this.state;

    if (isDisabled === isValid) {
      this.setState(({
        isDisabled: !isValid,
      }));
    }
  }

  _formValidation() {
    const {rating, comment} = this.state;
    const charsAmount = comment.length;
    const isTextValid = charsAmount >= CharsAmount.MIN && charsAmount <= CharsAmount.MAX;

    return isTextValid && rating !== null;;
  }

  _handleSubmit(evt) {
    evt.preventDefault();

    const {onSubmit, offerId} = this.props;
    const formData = new FormData(this._formRef.current);
    const review = {
      rating: formData.get(`rating`),
      comment: formData.get(`review`),
    };

    onSubmit(offerId, review);
  }

  render() {
    const {buttonText, isDisabled} = this.state;
    const {ButtonClassNames} = ClassNames;

    return (
      <form
        className="reviews__form form"
        action="#"
        method="post"
        ref={this._formRef}
        onSubmit={this._handleSubmit}
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
                  onChange={() => {
                    this.setState({
                      rating: count,
                    });
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
          onChange={(evt) => {
            this.setState({
              comment: evt.target.value,
            });
          }}
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set
            <span className="reviews__star">rating</span>
            and describe your stay with at least
            <b className="reviews__text-amount">50 characters</b>.
          </p>
          <Button
            className={ButtonClassNames.REVIEW}
            disabled={isDisabled}
          >
            {buttonText}
          </Button>
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
