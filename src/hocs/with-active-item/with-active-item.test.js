import React from "react";
import renderer from "react-test-renderer";
import withActiveItem from "./with-active-item.js";


const MockComponent = () => {
  return (
    <div></div>
  );
};

MockComponent.propTypes = {};

const MockComponentWrapped = withActiveItem(MockComponent);

describe(`withActiveItem HOC snapshot testing`, () => {
  it(`HOC rendering correctly`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          onItemClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
