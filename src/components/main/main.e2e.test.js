import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Main e2e testing:`, () => {
  it(`Should card title clicking`, () => {
    const onCardTitleClick = jest.fn();

    const main = mount(
        <Main
          cities={[`Moscow`, `St-Petersburg`]}
          placesCount={Offers.length}
          offers={Offers}
          onCardTitleClick={onCardTitleClick}
        />
    );

    const cardTitleElement = main.find(`h2.place-card__name`).at(0);

    cardTitleElement.simulate(`click`);

    expect(onCardTitleClick).toHaveBeenCalledTimes(1);
  });
});
