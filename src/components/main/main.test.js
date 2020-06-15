import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";


describe(`Main component tests`, () => {
  it(`Render Main`, () => {
    const tree = renderer
      .create(<Main
        cities={[`Moscow`, `St-Petersburg`]}
        placesToStay={4}
        offers={[`good place`, `bad place`]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
