import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import PlaceCardList from "./place-card-list.jsx";
import {ScreenType} from "../../common/const.js";
import history from "../../history.js";


const offersMock = [
  {
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
  }, {
    id: 1,
    type: `house`,
    city: {
      name: `Amsterdam`,
      coordinates: [52.38333, 4.9],
      zoom: 12
    },
    title: `Wood and stone place`,
    picture: `img/apartment-03.jpg`,
    price: 170,
    isPremium: true,
    isFavorite: false,
    rating: 5,
    coordinates: [
      52.369553943508,
      4.85309666406198
    ],
    details: {
      description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`,
      bedroomsCount: 3,
      pictures: [
        `img/room.jpg`,
        `img/apartment-02.jpg`,
      ],
      maxGuests: 4,
      insideItems: [
        `Wi-Fi`,
        `Heating`,
        `Kitchen`,
        `Washing machine`,
      ],
      host: {
        id: 1,
        avatar: `img/avatar-max.jpg`,
        name: `Max`,
        isPro: true,
      }
    }
  }, {
    id: 2,
    city: {
      name: `Amsterdam`,
      coordinates: [52.38333, 4.9],
      zoom: 12
    },
    title: `Canal view Princengracht`,
    picture: `img/room.jpg`,
    isPremium: false,
    isFavorite: true,
    price: 70,
    type: `room`,
    rating: 3,
    coordinates: [
      52.3909553943508,
      4.929309666406198
    ],
    details: {
      description: `Eligendi repellendus ut optio ad repudiandae`,
      bedroomsCount: 2,
      pictures: [
        `img/apartment-02.jpg`,
        `img/apartment-03.jpg`,
      ],
      maxGuests: 2,
      insideItems: [
        `Wi-Fi`,
        `Kitchen`,
        `Friddge`,
      ],
      host: {
        id: 2,
        avatar: `avatar.jpg`,
        name: `Alessa`,
        isPro: false,
      }
    }
  }, {
    id: 3,
    city: {
      name: `Amsterdam`,
      coordinates: [52.38333, 4.9],
      zoom: 12
    },
    title: `Nice, cozy, warm big bed apartment`,
    picture: `img/apartment-02.jpg`,
    isPremium: false,
    isFavorite: true,
    price: 150,
    type: `apartment`,
    rating: 4,
    coordinates: [
      52.3809553943508,
      4.939309666406198
    ],
    details: {
      description: `Quia labore atque nostrum eum repudiandae laboriosam`,
      bedroomsCount: 1,
      pictures: [
        `img/studio-01.jpg`,
        `img/apartment-01.jpg`,
      ],
      maxGuests: 2,
      insideItems: [
        `Wi-Fi`,
        `Kitchen`,
        `Friddge`,
        `Cabel TV`,
      ],
      host: {
        id: 3,
        avatar: `avatar-2.jpg`,
        name: `Kristian`,
        isPro: false,
      }
    }
  }
];

describe(`PlaceCardList snapshot checking`, () => {
  it(`PlaceCardList rendering in Main`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <PlaceCardList
            offers={offersMock}
            screenType={ScreenType.MAIN}
            onItemClick={() => {}}
            onCardMouseEnter={() => {}}
            onCardMouseLeave={() => {}}
            onBookmarkClick={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`PlaceCardList rendering in PlaceDetails`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <PlaceCardList
            offers={offersMock}
            screenType={ScreenType.DETAILS}
            onItemClick={() => {}}
            onCardMouseEnter={() => {}}
            onCardMouseLeave={() => {}}
            onBookmarkClick={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`PlaceCardList rendering in Favorites`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <PlaceCardList
            offers={offersMock}
            screenType={ScreenType.FAVORITES}
            onItemClick={() => {}}
            onCardMouseEnter={() => {}}
            onCardMouseLeave={() => {}}
            onBookmarkClick={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
