import React from "react";
import renderer from "react-test-renderer";
import FavoritesEmpty from "./favorites-empty.jsx";


it(`FavoritesEmpty snapshot testing`, () => {
  const tree = renderer.create(
      <FavoritesEmpty />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
