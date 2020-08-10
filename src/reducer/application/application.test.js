import {reducer, ActionType, ActionCreator} from "./application.js";
import {SortType} from "../../common/const.js";


const citiesMock = [
  {
    name: `Paris`,
    coordinates: [48.85, 2.34],
  }, {
    name: `Amsterdam`,
    coordinates: [52.38333, 4.9],
  }, {
    name: `Dusseldorf`,
    coordinates: [51.22, 6.77],
  }
];

describe(`Application Reducer testing`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      offerId: -1,
      currentCity: citiesMock[0],
      sortType: SortType.POPULAR.value,
    });
  });

  it(`Reducer should assign given value`, () => {
    expect(reducer({
      offerId: -1,
    }, {
      type: ActionType.SELECT_OFFER,
      payload: 2,
    })).toEqual({
      offerId: 2,
    });

    expect(reducer({
      currentCity: citiesMock[1],
    }, {
      type: ActionType.CHANGE_CITY,
      payload: citiesMock[2],
    })).toEqual({
      currentCity: citiesMock[2],
    });

    expect(reducer({
      sortType: SortType.POPULAR.value
    }, {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortType.RATING.value,
    })).toEqual({
      sortType: SortType.RATING.value,
    });
  });
});

describe(`Application ActionCreator testing`, () => {
  it(`ActionCreator returns correct action when offerId is changed`, () => {
    expect(ActionCreator.selectOffer(2)).toEqual({
      type: ActionType.SELECT_OFFER,
      payload: 2,
    });
  });

  it(`ActionCreator for changing city should returns correct action`, () => {
    expect(ActionCreator.changeCity(citiesMock[2])).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: citiesMock[2],
    });
  });

  it(`ActionCreator for changing sortType should returns correct action`, () => {
    expect(ActionCreator.changeSortType(SortType.HIGH_TO_LOW.value)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: SortType.HIGH_TO_LOW.value,
    });
  });
});
