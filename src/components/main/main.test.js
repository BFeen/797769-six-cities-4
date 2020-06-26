import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";


const Offers = [
  {
    id: 0,
    title: `Beautiful & luxurious apartment at great location`,
    picture: `img/apartment-01.jpg`,
    isPremium: true,
    price: 200,
    type: `Apartment`,
    rating: 4,
  }, {
    id: 1,
    title: `Wood and stone place`,
    picture: `img/studio-01.jpg`,
    isPremium: true,
    price: 170,
    type: `House`,
    rating: 5,
  }, {
    id: 2,
    title: `Canal view Princengracht`,
    picture: `img/room.jpg`,
    isPremium: false,
    price: 70,
    type: `Room`,
    rating: 3,
  }, {
    id: 3,
    title: `Nice, cozy, warm big bed apartment`,
    picture: `img/apartment-02.jpg`,
    isPremium: false,
    price: 150,
    type: `Apartment`,
    rating: 4,
  }
];

describe(`Main component tests:`, () => {
  it(`Render Main.`, () => {
    const tree = renderer
      .create(<Main
        cities={[`Moscow`, `St-Petersburg`]}
        placesCount={4}
        offers={Offers}
        onCardTitleClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
