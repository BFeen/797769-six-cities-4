import {Cities, SortType} from "../../common/const.js";
import {extend} from "../../common/utils.js";

const initialState = {
  currentCity: Cities[0],
  sortType: SortType.POPULAR,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity,
  }),

  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType,
  }),

  resetSortType: () => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: SortType.POPULAR,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        currentCity: action.payload,
      });
    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
