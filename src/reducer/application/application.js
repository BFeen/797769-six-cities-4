import {Cities, SortType} from "../../common/const.js";
import {extend} from "../../common/utils.js";

const initialState = {
  // currentOffer: {},
  currentCity: Cities[0],
  sortType: SortType.POPULAR.value,
};

const ActionType = {
  // SELECT_OFFER: `SELECT_OFFER`,
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
};

const ActionCreator = {
  // selectOffer: (offer) => ({
  //   type: ActionType.SELECT_OFFER,
  //   payload: offer,
  // }),

  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity,
  }),

  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case ActionType.SELECT_OFFER:
    //   return extend(state, {
    //     currentOffer: action.payload,
    //   });
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
