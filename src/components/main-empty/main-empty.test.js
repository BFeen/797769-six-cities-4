import React from "react";
import renderer from "react-test-renderer";
import MainEmpty from "./main-empty.jsx";


describe(`MainEmpty snapshot testing`, () => {
  it(`MainEmpty rendering`, () => {
    const tree = renderer.create(
        <MainEmpty
          city={`Dusseldorf`}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
