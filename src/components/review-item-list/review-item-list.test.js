import React from "react";
import renderer from "react-test-renderer";
import ReviewItemList from "./review-item-list.jsx";


const reviewsMock = [
  {
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
  }, {
    id: 1,
    comment: `Best place of the world!`,
    dateTime: new Date(`December 2012`),
    rating: 5,
    user: {
      id: 1,
      name: `John`,
      avatar: `https://api.adorable.io/avatars/128/5`,
      isPro: true,
    }
  }, {
    id: 2,
    comment: `The worst place of the world!`,
    dateTime: new Date(`June 2020`),
    rating: 1,
    user: {
      id: 2,
      name: `Mr. X`,
      avatar: `https://api.adorable.io/avatars/128/6`,
      isPro: false,
    }
  }, {
    id: 3,
    comment: `Nice. But too many roaches.`,
    dateTime: new Date(`May 3001`),
    rating: 3,
    user: {
      id: 3,
      name: `Leela Turanga`,
      avatar: `https://api.adorable.io/avatars/128/7`,
      isPro: false,
    }
  },
];

describe(`ReviewItemList snapshot testing`, () => {
  it(`ReviewItemList rendering`, () => {
    const tree = renderer.create(
        <ReviewItemList
          offerId={2}
          reviews={reviewsMock}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
