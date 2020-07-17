import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";


const offersMock = [
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

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Main e2e testing`, () => {
  it(`Should card title clicking and handle it`, () => {
    const handleCardTitleClick = jest.fn();

    const main = mount(
        <Main
          offers={offersMock}
          city={cityMock}
          mapClassName={`cities`}
          onCardTitleClick={handleCardTitleClick}
          onCityChange={() => {}}
        />
    );

    const cardTitleElement = main.find(`h2.place-card__name`).at(0);

    cardTitleElement.simulate(`click`);

    expect(handleCardTitleClick).toHaveBeenCalledTimes(1);
    expect(handleCardTitleClick).toHaveBeenCalledWith(offersMock[0].id);
  });
<<<<<<< HEAD
=======

// Этот тест для CitiesList
  // it(`Should adding class by clicking on element`, () => {
  //   const handleCityChange = jest.fn();

  //   const main = mount(
  //       <Main
  //         offers={offersMock}
  //         city={cityMock}
  //         mapClassName={`cities`}
  //         onCardTitleClick={() => {}}
  //         onCityChange={handleCityChange}
  //       />
  //   );

  //   const cityElement = main.find(`li.locations__item`).at(1);

  //   cityElement.simulate(`click`);

  //   expect(handleCityChange).toHaveBeenCalledTimes(1);
  // });
>>>>>>> 3e8bca2327fe64b5047948d661c4a75f32649907
});
