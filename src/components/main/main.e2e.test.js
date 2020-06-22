import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";


const Offers = [
  {
    description: `Beautiful & luxurious apartment at great location`,
    picture: `img/apartment-01.jpg`,
    isPremium: true,
    price: 200,
    type: `Apartment`,
    rating: 4,
  }, {
    description: `Wood and stone place`,
    picture: `img/studio-01.jpg`,
    isPremium: true,
    price: 170,
    type: `House`,
    rating: 5,
  }, {
    description: `Canal view Princengracht`,
    picture: `img/room.jpg`,
    isPremium: false,
    price: 70,
    type: `Room`,
    rating: 3,
  }, {
    description: `Nice, cozy, warm big bed apartment`,
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
