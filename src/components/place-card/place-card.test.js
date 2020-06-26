import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const offer = {
  id: 0,
  title: `Beautiful & luxurious apartment at great location`,
  picture: `img/apartment-01.jpg`,
  isPremium: true,
  price: 200,
  type: `Apartment`,
  rating: 4,
};

describe(`PlaceCard snapshot testing`, () => {
  it(`PlaceCard rendering`, () => {
    const tree = renderer.create(
        <PlaceCard
          key={`${offer.id + 0}`}
          offer={offer}
          onCardMouseEnter={() => {}}
          onCardTitleClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
