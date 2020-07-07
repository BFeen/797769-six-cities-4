import React from "react";
import renderer from "react-test-renderer";
import ReviewItemList from "./review-item-list.jsx";


const reviews = [
  {
    offerId: 0,
    userName: `Max`,
    userAvatar: `img/avatar-max.jpg`,
    rating: 4,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    dateTime: `April 2014`
  }, {
    offerId: 1,
    userName: `John`,
    userAvatar: `https://api.adorable.io/avatars/128/5`,
    rating: 5,
    description: `Best place of the world!`,
    dateTime: `December 2012`
  }, {
    offerId: 2,
    userName: `Mr. X`,
    userAvatar: `https://api.adorable.io/avatars/128/6`,
    rating: 1,
    description: `The worst place of the world!`,
    dateTime: `June 2020`
  }, {
    offerId: 3,
    userName: `Leela Turanga`,
    userAvatar: `https://api.adorable.io/avatars/128/7`,
    rating: 3,
    description: `Nice. But too many roaches.`,
    dateTime: `May 3001`
  }
];

describe(`ReviewItemList snapshot testing`, () => {
  it(`ReviewItemList rendering`, () => {
    const tree = renderer.create(
        <ReviewItemList
          offerId={2}
          reviews={reviews}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
