import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";


const offerMock = {
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
          onItemClick={() => {}}
          onCardMouseEnter={handleCardMouseEnter}
          onCardMouseLeave={() => {}}
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
          onItemClick={() => {}}
          onCardMouseEnter={() => {}}
          onCardMouseLeave={handleCardMouseLeave}
        />
    );

    const article = placeCard.find(`article`);
    article.simulate(`mouseleave`);

    expect(handleCardMouseLeave).toHaveBeenCalledTimes(1);
  });
});
