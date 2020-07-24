import React from "react";
import renderer from "react-test-renderer";
import withActiveCard from "./with-active-card.js";


const MockComponent = () => {
  return (
    <div></div>
  );
};

MockComponent.propTypes = {};

const MockComponentWrapped = withActiveCard(MockComponent);

describe(`WithActiveCard snapshot testing`, () => {
  it(`HOC WithActiveCard rendering correctly`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          onCardMouseEnter={() => {}}
          onCardMouseLeave={() => {}}
          activeCard={{}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
