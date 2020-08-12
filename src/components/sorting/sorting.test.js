import React from "react";
import renderer from "react-test-renderer";
import Sorting from "./sorting.jsx";
import {SortType} from "../../common/const.js";


describe(`Sorting component snapshot testing`, () => {
  it(`Sorting rendering correctly`, () => {
    const tree = renderer.create(
        <Sorting
          isOpened={false}
          currentSortType={SortType.POPULAR}
          onSelectSortType={() => {}}
          onMenuClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Sorting with open menu rendering correctly`, () => {
    const tree = renderer.create(
        <Sorting
          isOpened={true}
          currentSortType={SortType.POPULAR}
          onSelectSortType={() => {}}
          onMenuClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
