import * as React from "react";
import {connect} from "react-redux";
import {Operation} from "../../reducer/data/data";


const CharsAmount = {
  MIN: 50,
  MAX: 300,
};

enum ButtonText {
  SUBMIT = `Submit`,
  SENDING = `Sending...`,
}

type Review = {
  rating: number;
  comment: string;
}

interface Props {
  offerId: number;
  handleSubmit: (offerId: number, review: Review) => Promise<{}>;
}

interface State {
  isSending: boolean;
  isDisabled: boolean;
  rating: number | null;
  comment: string;
  errorMessage: string;
  buttonText: ButtonText;
}

const withReview = (Component) => {
  class WithReview extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.handleCommentChange = this.handleCommentChange.bind(this);
      this.handleRatingChange = this.handleRatingChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        isSending: false,
        isDisabled: true,
        rating: null,
        comment: ``,
        errorMessage: ``,
        buttonText: ButtonText.SUBMIT,
      };
    }

    componentDidUpdate() {
      if (!this.state.isSending) {
        const isValid = this._formValidation();
        this._btnDisabling(isValid);
      }
    }

    handleCommentChange(review) {
      const {errorMessage} = this.state;
      if (errorMessage) {
        this.setState(({
          errorMessage: ``,
        }));
      }

      this.setState(({
        comment: review,
      }));
    }

    handleRatingChange(count) {
      this.setState(({
        rating: count,
      }));
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
          this._clearForm();
        })
        .catch(() => {
          this.setState(({
            errorMessage: `Something went wrong. Please try again later.`,
          }));
        })
        .finally(() => {
          this.setState(({
            isSending: false,
            buttonText: ButtonText.SUBMIT,
          }));
        });
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

      return isTextValid && rating !== null;
    }

    _clearForm() {
      this.setState(({
        rating: null,
        comment: ``,
        errorMessage: ``,
      }));
    }

    render() {
      const {
        buttonText,
        isDisabled,
        rating,
        comment,
        errorMessage,
      } = this.state;

      return (
        <Component
          {...this.props}
          buttonText={buttonText}
          isDisabled={isDisabled}
          rating={rating}
          comment={comment}
          errorMessage={errorMessage}
          onSubmit={this.onSubmit}
          onCommentChange={this.handleCommentChange}
          onRatingChange={this.handleRatingChange}
        />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    handleSubmit: (offerId, review) => {
      return dispatch(Operation.postReview(offerId, review));
    }
  });

  return connect(null, mapDispatchToProps)(WithReview);
};

export default withReview;
