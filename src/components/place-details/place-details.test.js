import React from "react";
import renderer from "react-test-renderer";
import PlaceDetails from "./place-details.jsx";


const offer = {
  id: 0,
  title: `Beautiful & luxurious apartment at great location`,
  picture: `img/apartment-01.jpg`,
  isPremium: true,
  price: 200,
  type: `Apartment`,
  rating: 4,
}

describe(`PlaceDetails snapshot test`, () => {
  it(`PlaceDetails rendering`, () => {
    const tree = renderer.create(
      <PlaceDetails
        offer={offer}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
