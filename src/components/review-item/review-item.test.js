import React from "react";
import renderer from "react-test-renderer";
import ReviewItem from "./review-item.jsx";


const mockReview = {
  offerId: 1,
  userName: `John`,
  userAvatar: `https://api.adorable.io/avatars/128/5`,
  rating: 5,
  description: `Best place of the world!`,
  dateTime: `December 2012`
};

describe(`ReviewItem snapshot testing`, () => {
  it(`Review item rendering correctly`, () => {
    const tree = renderer.create(
        <ReviewItem
          review={mockReview}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
