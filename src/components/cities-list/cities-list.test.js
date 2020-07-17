import React from "react";
import renderer from "react-test-renderer";
import CitiesList from "./cities-list.jsx";


describe(`CitiesList snapshot testing`, () => {
  it(`CitiesList rendering`, () => {
    const tree = renderer.create(
        <CitiesList
          onCityChange={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});