import React from "react";
import renderer from "react-test-renderer";
import ReviewItem from "./review-item.jsx";


const mockReview = {
  id: 0,
  comment: `A quiet cozy and picturesque that...`,
  dateTime: new Date(`2014-03-31T20:00:00.000Z`),
  rating: 4,
  user: {
    id: 0,
    name: `Max`,
    avatar: `img/avatar-max.jpg`,
    isPro: true,
  }
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
