import React from "react";
import PropTypes from "prop-types";
import ReviewItem from "../review-item/review-item.jsx";
import reviews from "../../mocks/reviews.js";
import reviewPropTypes from "../../prop-types/review-prop-types.js";


const ReviewItemList = (props) => {
  const {offerId} = props;

  return (
    reviews.filter((item, index) => {
      if (item.offerId === offerId) {
        return (
          <ReviewItem
            key={`${item.offerId}${index}`}
            review={item}
          />
        );
      }
    })
  );
};

ReviewItemList.PropTypes = {
  reviews: PropTypes.arrayOf(reviewPropTypes),
};
