import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CitiesList from "./cities-list.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});

const citiesMock = [{
  name: `Paris`,
  coordinates: [48.85, 2.34],
  zoom: 13,
}, {
  name: `Cologne`,
  coordinates: [50.93, 6.95],
  zoom: 13,
}];

describe(`CitiesList e2e testing`, () => {
  it(`Should adding class by clicking on element`, () => {
    const handleCityChange = jest.fn((newCity) => {
      citiesList.setProps({currentCity: newCity});
    });

    const citiesList = shallow(
        <CitiesList
          currentCity={citiesMock[0]}
          onItemClick={handleCityChange}
        />
    );

    const cityElement = citiesList.find(`li.locations__item`).at(1);

    cityElement.simulate(`click`);

    expect(handleCityChange).toHaveBeenCalledTimes(1);
    expect(handleCityChange).toHaveBeenCalledWith(citiesMock[1]);

    const updatedCityElement = citiesList.find(`li.locations__item a`).at(1);

    expect(updatedCityElement.hasClass(`tabs__item--active`)).toEqual(true);
  });
});
