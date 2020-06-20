import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const Offers = [
  {
    description: `Beautiful & luxurious apartment at great location`,
    picture: `img/apartment-01.jpg`,
    isPremium: true,
    price: 200,
    type: `Apartment`,
    rating: 4,
  }, {
    description: `Wood and stone place`,
    picture: `img/studio-01.jpg`,
    isPremium: true,
    price: 170,
    type: `House`,
    rating: 5,
  }, {
    description: `Canal view Princengracht`,
    picture: `img/room.jpg`,
    isPremium: false,
    price: 70,
    type: `Room`,
    rating: 3,
  }, {
    description: `Nice, cozy, warm big bed apartment`,
    picture: `img/apartment-02.jpg`,
    isPremium: false,
    price: 150,
    type: `Apartment`,
    rating: 4,
  }
];

describe(`PlaceCard snapshot testing`, () => {
  it(`PlaceCard rendering`, () => {
    const tree = renderer.create(
        <PlaceCard
          offers={Offers}
          onMouseEnter={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
