import * as React from "react";
import ReviewItem from "../review-item/review-item";
import {IReview} from "../../common/types";


interface Props {
  reviews: IReview[];
}

const ReviewItemList: React.FunctionComponent<Props> = (props) => {
  const {reviews} = props;
  const reviewsAmount = reviews.length;

  return (
    <React.Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsAmount}</span></h2>
      <ul className="reviews__list">
        {reviews.slice(0, 10).map((item, index) => {
          return (
            <ReviewItem
              key={`${item.id}${index}`}
              review={item}
            />
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default ReviewItemList;
