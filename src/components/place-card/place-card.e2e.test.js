import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";


const offer = {
  id: 0,
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
  it(`Should PlaceCard mouse enter handler calles with correct mock`, () => {
    const handleCardMouseEnter = jest.fn();

    const placeCard = shallow(
        <PlaceCard
          offer={offer}
          onCardMouseEnter={handleCardMouseEnter}
          onCardTitleClick={() => {}}
        />
    );

    const article = placeCard.find(`article`);
    article.simulate(`mouseenter`, {target: offer});

    expect(handleCardMouseEnter).toHaveBeenCalledTimes(1);
    expect(handleCardMouseEnter).toHaveBeenCalledWith(offer);
  });
});
