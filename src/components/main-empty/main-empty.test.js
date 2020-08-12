import React from "react";
import renderer from "react-test-renderer";
import MainEmpty from "./main-empty.jsx";


describe(`MainEmpty snapshot testing`, () => {
  it(`MainEmpty rendering`, () => {
    const tree = renderer.create(
        <MainEmpty
          errorMessage={``}
          city={`Dusseldorf`}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`MainEmpty with error message rendering`, () => {
    const tree = renderer.create(
        <MainEmpty
          errorMessage={`I'm so sorrrrrryyyyyy`}
          city={`Dusseldorf`}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
