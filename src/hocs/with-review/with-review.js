import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getOfferId} from "../../reducer/application/selectors";


const CharsAmount = {
  MIN: 50,
  MAX: 300,
};

const ButtonText = {
  SUBMIT: `Submit`,
  SENDING: `Sending...`,
};

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.handleCommentChange = this.handleCommentChange.bind(this);
      this.handleRatingChange = this.handleRatingChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        rating: null,
        comment: ``,
        isDisabled: true,
        isSending: false,
        buttonText: ButtonText.SUBMIT,
      };
    }

    handleCommentChange(review) {
      this.setState(({
        comment: review,
      }));
    }

    handleRatingChange(count) {
      this.setState(({
        rating: count,
      }));
    }

    componentDidUpdate() {
      const isValid = this._formValidation();

      if (!this.state.isSending) {
        this._btnDisabling(isValid);
      }
    }
    
    onSubmit() {
      this.setState(({
        isSending: true,
        isDisabled: true,
        buttonText: ButtonText.SENDING,
      }));

      const {handleSubmit, offerId} = this.props;
      const {rating, comment} = this.state;
      const review = {
        rating,
        comment,
      };

      handleSubmit(offerId, review)
        .then(() => {
          console.log(`данные отправлены`);
          this._clearForm();
        })
        .catch((err) => {
          console.log(`сообщение от сервера: ${err}`);
        })
        .finally(() => {
          this.setState(({
            isSending: false,
            buttonText: ButtonText.SUBMIT,
          }));
        })
    }
  
    _btnDisabling(isValid) {
      if (this.state.isDisabled === isValid) {
        this.setState(({
          isDisabled: !isValid,
        }));
      }
    }
  
    _formValidation() {
      const {rating, comment} = this.state;
      const commentLength = comment.length;
      const isTextValid = commentLength >= CharsAmount.MIN && commentLength <= CharsAmount.MAX;
  
      return isTextValid && rating !== null;;
    }
  
    _clearForm() {
      this.setState(({
        rating: null,
        comment: ``,
      }));
    }

    render() {
      const {buttonText, isDisabled, rating, comment} = this.state;

      return (
        <Component
          {...this.props}
          buttonText={buttonText}
          isDisabled={isDisabled}
          rating={rating}
          comment={comment}
          onSubmit={this.onSubmit}
          onCommentChange={this.handleCommentChange}
          onRatingChange={this.handleRatingChange}
        />
      );
    }
  }

  WithReview.propTypes = {
    offerId: PropTypes.number.isRequired,
  };

  const mapStateToProps = (state) => ({
    offerId: getOfferId(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    handleSubmit: (offerId, review) => {
      return new Promise((resolve, reject) => {
        console.log(`Отправляю данные`)
        console.log(review)
        setTimeout(() => {
          if(Math.random() > 0.5) {
            resolve(`Данные отправлены`)
          } else {
            reject(`Произошла ошибка`)
          }
        }, 2000);
      });
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReview);
};

export default withReview;
