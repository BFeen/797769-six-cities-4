import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";


describe(`App component tests`, () => {
  it(`Render App`, () => {
    const tree = renderer
      .create(<App
        cities={[`Moscow`, `St-Petersburg`]}
        placesToStay={4}
        offers={[`good place`, `bad place`]}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
