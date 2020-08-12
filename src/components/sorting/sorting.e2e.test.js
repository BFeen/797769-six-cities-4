import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Sorting from "./sorting.jsx";
import {SortType} from "../../common/const.js";


Enzyme.configure({
  adapter: new Adapter()
});

describe(`Sorting e2e testing`, () => {
  it(`Sorting on menu item clicking should changing sortType`, () => {
    const handleSortTypeChange = jest.fn();

    const sorting = shallow(
        <Sorting
          isOpened={false}
          currentSortType={SortType.POPULAR}
          onSelectSortType={handleSortTypeChange}
          onMenuClick={() => {}}
        />
    );

    const selectedSortType = `Price: low to high`;
    sorting.find(`li.places__option`).at(1).simulate(`click`, selectedSortType);

    expect(handleSortTypeChange).toHaveBeenCalledTimes(1);
    expect(handleSortTypeChange).toHaveBeenCalledWith(selectedSortType);
  });
});
