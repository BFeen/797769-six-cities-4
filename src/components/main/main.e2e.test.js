import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "./main.jsx";


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
          sortType={`popular`}
          mapClassName={`cities`}
          onCardTitleClick={handleCardTitleClick}
          handleCityChange={() => {}}
          handleSortTypeChange={() => {}}
          onCardMouseEnter={() => {}}
          onCardMouseLeave={() => {}}
          activeCard={{}}
        />
    );

    const cardTitleElement = main.find(`h2.place-card__name`).at(0);

    cardTitleElement.simulate(`click`);

    expect(handleCardTitleClick).toHaveBeenCalledTimes(1);
    expect(handleCardTitleClick).toHaveBeenCalledWith(offersMock[0].id);
  });
});
