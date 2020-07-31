import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const offerMock = {
  id: 0,
  type: `apartment`,
  city: `Amsterdam`,
  title: `Beautiful & luxurious apartment at great location`,
  picture: `img/apartment-01.jpg`,
  price: 200,
  isPremium: true,
  isFavorite: false,
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
        <PlaceCard
          key={`${offerMock.id + 0}`}
          offer={offerMock}
          className={`cities__place-card`}
          onCardMouseEnter={() => {}}
          onCardMouseLeave={() => {}}
          onItemClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
