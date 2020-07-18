import React from "react";
import renderer from "react-test-renderer";
import MainEmpty from "./main-empty.jsx";


describe(`MainEmpty snapshot testing`, () => {
  it(`MainEmpty rendering`, () => {
    const tree = renderer.create(
        <MainEmpty/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
