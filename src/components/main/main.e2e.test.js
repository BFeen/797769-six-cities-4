import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";


Enzyme.configure({
  adapter: new Adapter()
});

describe(`Main e2e testing:`, () => {
  it(`Should card title clicking.`, () => {
    const onCardTitleClick = jest.fn();

    const main = shallow(
        <Main
          cities={[`Moscow`, `St-Petersburg`]}
          placesToStay={4}
          offers={[`good place`]}
          onCardTitleClick={onCardTitleClick}
        />
    );

    const cardTitleElement = main.find(`h2.place-card__name`);

    cardTitleElement.simulate(`click`);

    expect(onCardTitleClick).toHaveBeenCalledTimes(1);
  });
});
