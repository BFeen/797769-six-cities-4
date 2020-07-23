import React from "react";
import renderer from "react-test-renderer";
import Sorting from "./sorting.jsx";


describe(`Sorting component snapshot testing`, () => {
  it(`Sorting renderinng correctly`, () => {
    const tree = renderer.create(
        <Sorting
          onSortTypeChange={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
