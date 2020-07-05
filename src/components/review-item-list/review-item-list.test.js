import React from "react";
import renderer from "react-test-renderer";
import ReviewItemList from "./review-item-list.jsx";

describe(`ReviewItemList snapshot testing`, () => {
  it(`ReviewItemList rendering`, () => {
    const tree = renderer.create(
      <ReviewItemList
        offerId={2}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  })
});