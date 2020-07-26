import React from "react";
import renderer from "react-test-renderer";
import CitiesList from "./cities-list.jsx";


const cityMock = {
  name: `Paris`,
  coordinates: [48.85, 2.34],
};

describe(`CitiesList snapshot testing`, () => {
  it(`CitiesList rendering`, () => {
    const tree = renderer.create(
        <CitiesList
          currentCity={cityMock}
          onItemClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
