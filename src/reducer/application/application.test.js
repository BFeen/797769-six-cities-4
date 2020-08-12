import {reducer, ActionType, ActionCreator} from "./application.js";
import {SortType} from "../../common/const.js";


const citiesMock = [
  {
    name: `Paris`,
    coordinates: [48.85, 2.34],
    zoom: 13,
  }, {
    name: `Amsterdam`,
    coordinates: [52.38333, 4.9],
    zoom: 13,
  }, {
    name: `Dusseldorf`,
    coordinates: [51.22, 6.77],
    zoom: 13,
  }
];

describe(`Application Reducer testing`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      currentCity: citiesMock[0],
      sortType: SortType.POPULAR,
    });
  });

  it(`Reducer should assign given value`, () => {
    expect(reducer({
      currentCity: citiesMock[1],
    }, {
      type: ActionType.CHANGE_CITY,
      payload: citiesMock[2],
    })).toEqual({
      currentCity: citiesMock[2],
    });

    expect(reducer({
      sortType: SortType.POPULAR
    }, {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortType.RATING,
    })).toEqual({
      sortType: SortType.RATING,
    });
  });
});

describe(`Application ActionCreator testing`, () => {
  it(`ActionCreator for changing city should returns correct action`, () => {
    expect(ActionCreator.changeCity(citiesMock[2])).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: citiesMock[2],
    });
  });

  it(`ActionCreator for changing sortType should returns correct action`, () => {
    expect(ActionCreator.changeSortType(SortType.HIGH_TO_LOW)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortType.HIGH_TO_LOW,
    });
  });

  it(`ActionCreator for reset sortType should returns correct action`, () => {
    expect(ActionCreator.resetSortType()).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortType.POPULAR,
    });
  });
});
