import React, {Fragment} from "react";
import PropTypes from "prop-types";
import ReviewItem from "../review-item/review-item.jsx";
import reviewPropTypes from "../../prop-types/review-prop-types.js";


const ReviewItemList = (props) => {
  const {reviews} = props;
  const reviewsAmount = reviews.length;

  return (
    <Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsAmount}</span></h2>
      <ul className="reviews__list">
        {reviews.map((item, index) => {
          return (
            <ReviewItem
              key={`${item.id}${index}`}
              review={item}
            />
          );
        })}
      </ul>
    </Fragment>
  );
};

ReviewItemList.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
};

export default ReviewItemList;
