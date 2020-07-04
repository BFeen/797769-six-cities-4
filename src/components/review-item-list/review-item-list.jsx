import React, {Fragment} from "react";
import PropTypes from "prop-types";
import ReviewItem from "../review-item/review-item.jsx";
import reviews from "../../mocks/reviews.js";
import reviewPropTypes from "../../prop-types/review-prop-types.js";


const ReviewItemList = (props) => {
  const {offerId} = props;

  return (
    <Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
      <ul className="reviews__list">
        {reviews.map((item, index) => {
          if (item.offerId === offerId) {
            return (
              <ReviewItem
                key={`${item.offerId}${index}`}
                review={item}
              />
            );
          }
        })}
      </ul>
    </Fragment>
  );
};

ReviewItemList.propTypes = {
  offerId: PropTypes.number.isRequired,
};

export default ReviewItemList;
