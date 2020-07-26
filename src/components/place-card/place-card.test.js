import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const offer = {
  id: 0,
  city: `Amsterdam`,
  title: `Beautiful & luxurious apartment at great location`,
  picture: `img/apartment-01.jpg`,
  isPremium: true,
  price: 200,
  type: `Apartment`,
  rating: 4,
  coordinates: [
    52.3909553943508,
    4.85309666406198
  ],
};

describe(`PlaceCard snapshot testing`, () => {
  it(`PlaceCard rendering`, () => {
    const tree = renderer.create(
        <PlaceCard
          key={`${offer.id + 0}`}
          offer={offer}
          className={`cities__place-card`}
          onCardMouseEnter={() => {}}
          onCardMouseLeave={() => {}}
          onItemClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
