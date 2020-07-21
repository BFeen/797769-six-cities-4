import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Sorting from "./sorting.jsx";


Enzyme.configure({
  adapter: new Adapter()
});

describe(`Sorting e2e testing`, () => {
  it(`Should changing sortType`, () => {
    const handleSortTypeChange = jest.fn();

    const sorting = shallow(
      <Sorting
        onSortTypeChange={handleSortTypeChange}
      />
    );

    const selectedSortType = `to-high`;
    const select = sorting.find(`select`).simulate(`change`, {target: {value: selectedSortType}});

    expect(handleSortTypeChange).toHaveBeenCalledTimes(1);
    expect(handleSortTypeChange).toHaveBeenCalledWith(selectedSortType);
  });
});