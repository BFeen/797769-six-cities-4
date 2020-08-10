import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`PlaceCard e2e tests`, () => {
  it(`Should PlaceCard mouse enter handler calls with correct arguments`, () => {
    const handleCardMouseEnter = jest.fn();

    const placeCard = shallow(
        <PlaceCard
          offer={offerMock}
          className={`cities__place-card`}
          isFavoriteScreen={false}
          onItemClick={() => {}}
          onCardMouseEnter={handleCardMouseEnter}
          onCardMouseLeave={() => {}}
          onBookmarkClick={() => {}}
        />
    );

    const article = placeCard.find(`article`);
    article.simulate(`mouseenter`, {target: offerMock});

    expect(handleCardMouseEnter).toHaveBeenCalledTimes(1);
    expect(handleCardMouseEnter).toHaveBeenCalledWith(offerMock);
  });

  it(`Should PlaceCard mouse leave handler calls`, () => {
    const handleCardMouseLeave = jest.fn();

    const placeCard = shallow(
        <PlaceCard
          offer={offerMock}
          className={`cities__place-card`}
          isFavoriteScreen={false}
          onItemClick={() => {}}
          onCardMouseEnter={() => {}}
          onCardMouseLeave={handleCardMouseLeave}
          onBookmarkClick={() => {}}
        />
    );

    const article = placeCard.find(`article`);
    article.simulate(`mouseleave`);

    expect(handleCardMouseLeave).toHaveBeenCalledTimes(1);
  });

  it(`Should card title clicking and handle it`, () => {
    const handleCardTitleClick = jest.fn();

    const placeCard = shallow(
        <PlaceCard
          offer={offerMock}
          className={`cities__place-card`}
          isFavoriteScreen={false}
          onItemClick={handleCardTitleClick}
          onCardMouseEnter={() => {}}
          onCardMouseLeave={() => {}}
          onBookmarkClick={() => {}}
        />
    );

    const cardTitleElement = placeCard.find(`h2.place-card__name`);
    cardTitleElement.simulate(`click`);

    expect(handleCardTitleClick).toHaveBeenCalledTimes(1);
    expect(handleCardTitleClick).toHaveBeenCalledWith(offerMock.id);
  });

  it(`Should handle bookmark clicking`, () => {
    const handleBookmarkClick = jest.fn();

    const placeCard = shallow(
        <PlaceCard
          offer={offerMock}
          className={`cities__place-card`}
          isFavoriteScreen={false}
          onItemClick={() => {}}
          onCardMouseEnter={() => {}}
          onCardMouseLeave={() => {}}
          onBookmarkClick={handleBookmarkClick}
        />
    );

    const bookmarkBtn = placeCard.find(`button.place-card__bookmark-button`);
    bookmarkBtn.simulate(`click`);

    expect(handleBookmarkClick).toHaveBeenCalledTimes(1);
    expect(handleBookmarkClick).toHaveBeenCalledWith(offerMock.id, offerMock.isFavorite);
  });
});
