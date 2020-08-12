import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import PlaceCard from "./place-card.jsx";
import history from "../../history.js";


const offerMock = {
  id: 0,
  type: `apartment`,
  city: {
    name: `Amsterdam`,
    coordinates: [52.38333, 4.9],
    zoom: 12
  },
  title: `Beautiful & luxurious apartment at great location`,
  picture: `img/apartment-01.jpg`,
  price: 200,
  isPremium: true,
  isFavorite: true,
  rating: 4,
  coordinates: [
    52.3909553943508,
    4.85309666406198
  ],
  details: {
    description: `A quiet cozy and picturesque that hides behind a a river...`,
    bedroomsCount: 3,
    pictures: [
      `img/apartment-01.jpg`,
      `img/room.jpg`,
    ],
    maxGuests: 4,
    insideItems: [
      `Wi-Fi`,
      `Heating`,
      `Kitchen`,
    ],
    host: {
      id: 0,
      avatar: `img/avatar-angelina.jpg`,
      name: `Angelina`,
      isPro: true,
    }
  }
};

describe(`PlaceCard snapshot testing`, () => {
  it(`PlaceCard rendering`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <PlaceCard
            offer={offerMock}
            className={`cities__place-card`}
            isFavoriteScreen={false}
            onCardMouseEnter={() => {}}
            onCardMouseLeave={() => {}}
            onItemClick={() => {}}
            onBookmarkClick={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Rendering PlaceCard on the favorite-screen`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <PlaceCard
            offer={offerMock}
            className={`favorites__card`}
            isFavoriteScreen={true}
            onCardMouseEnter={() => {}}
            onCardMouseLeave={() => {}}
            onItemClick={() => {}}
            onBookmarkClick={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
