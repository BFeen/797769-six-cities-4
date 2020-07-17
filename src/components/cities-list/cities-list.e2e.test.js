import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CitiesList from "./cities-list.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});

const citiesMock = [{
    name: `Paris`,
    isActive: true,
    coordinates: [48.85, 2.34],
  }, {
    name: `Cologne`,
    isActive: false,
    coordinates: [50.93, 6.95],
  },
];

describe(`CitiesList e2e testing`, () => {
  it(`Should adding class by clicking on element`, () => {
    const handleCityChange = jest.fn();

    const citiesList = mount(
        <CitiesList
          currentCity={citiesMock[0]}
          onCityChange={handleCityChange}
        />
    );

    const cityElement = citiesList.find(`li.locations__item`).at(1);

    cityElement.simulate(`click`);

    expect(handleCityChange).toHaveBeenCalledTimes(1);
    expect(handleCityChange).toHaveBeenCalledWith(citiesMock[1]);

    const cityLink = citiesList.find(`a.locations__item-link`).at(1);

    expect(cityLink.hasClass(`tabs__item--active`)).toBe(true);
  });
});
