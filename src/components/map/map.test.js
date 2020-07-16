import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";


const offers = [
  {
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
  }, {
    id: 1,
    city: `Amsterdam`,
    title: `Wood and stone place`,
    picture: `img/apartment-03.jpg`,
    isPremium: true,
    price: 170,
    type: `House`,
    rating: 5,
    coordinates: [
      52.369553943508,
      4.85309666406198
    ]
  }, {
    id: 2,
    city: `Amsterdam`,
    title: `Canal view Princengracht`,
    picture: `img/room.jpg`,
    isPremium: false,
    price: 70,
    type: `Room`,
    rating: 3,
    coordinates: [
      52.3909553943508,
      4.929309666406198
    ]
  }, {
    id: 3,
    city: `Amsterdam`,
    title: `Nice, cozy, warm big bed apartment`,
    picture: `img/apartment-02.jpg`,
    isPremium: false,
    price: 150,
    type: `Apartment`,
    rating: 4,
    coordinates: [
      52.3809553943508,
      4.939309666406198
    ]
  }
];

const cityMock = {
  name: `Amsterdam`,
  isActive: false,
  coordinates: [52.38333, 4.9],
};

describe(`Map snapshot testing`, () => {
  it(`Map with classname 'cities' rendering correctly`, () => {
    const tree = renderer.create(
        <Map
          city={cityMock}
          mapClassName={`cities`}
          offers={offers}
        />, {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Map with classname 'property' rendering correctly`, () => {
    const tree = renderer.create(
        <Map
          city={cityMock}
          mapClassName={`property`}
          offers={offers}
        />, {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
