import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {App} from "./app.jsx";


const mockStore = configureStore([]);

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

const cityMock = {
  name: `Amsterdam`,
  coordinates: [52.38333, 4.9],
};

describe(`App snapshot test`, () => {
  it(`Main screen rendering`, () => {
    const store = mockStore({
      sortType: `popular`,
      handleCityChange: () => {},
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            offers={offersMock}
            city={cityMock}
            offerId={-1}
            reviews={reviews}
            handleCardTitleClick={() => {}}
          />
        </Provider>, {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Details screen rendering`, () => {
    const store = mockStore({
      handleCityChange: () => {},
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            offerId={0}
            offers={offersMock}
            city={cityMock}
            reviews={reviews}
            handleCardTitleClick={() => {}}
          />
        </Provider>, {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
