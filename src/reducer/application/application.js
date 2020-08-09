import {Cities, SortType} from "../../common/const.js";
import {extend} from "../../common/utils.js";

const initialState = {
  // screenMode: ScreenMode.MAIN,
  offerId: -1,
  currentCity: Cities[0],
  sortType: SortType.POPULAR.value,
};

const ActionType = {
  // CHANGE_SCREEN: `CHANGE_SCREEN`,
  SELECT_OFFER: `SELECT_OFFER`,
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
};

const ActionCreator = {
  // changeScreen: (screenMode) => ({
  //   type: ActionType.CHANGE_SCREEN,
  //   payload: screenMode,
  // }),

  selectOffer: (offerId) => ({
    type: ActionType.SELECT_OFFER,
    payload: offerId,
  }),

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
    // case ActionType.CHANGE_SCREEN:
    //   return extend(state, {
    //     screenMode: action.payload,
    //   });
    case ActionType.SELECT_OFFER:
      return extend(state, {
        offerId: action.payload,
      });
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
