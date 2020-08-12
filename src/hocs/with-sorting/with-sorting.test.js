import React from "react";
import renderer from "react-test-renderer";
import withSorting from "./with-sorting.js";


const MockComponent = () => {
  return (
    <form></form>
  );
}

MockComponent.propTypes = {};

const MockComponentWrapped = withSorting(MockComponent);

it(`with-sorting HOC snapshot testing`, () => {
  const tree = renderer.create(
    <MockComponentWrapped
      isOpened={false}
      onMenuClick={() => {}}
      onSelectSortType={() => {}}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
