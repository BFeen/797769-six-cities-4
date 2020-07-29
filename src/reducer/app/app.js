import {cities, SortType, getOffersByCity} from "./common/const.js";
import {extend} from "../../common/utils.js";


const initialState = {
  offerId: -1,
  currentCity: cities[0],
  sortType: SortType.POPULAR.value,
};

const ActionType = {
  SELECT_OFFER: `SELECT_OFFER`,
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
};

const ActionCreator = {
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
    case ActionType.SELECT_OFFER:
      return extend(state, {
        offerId: action.payload,
      });
    case ActionType.CHANGE_CITY:
      return extend(state, {
        currentCity: action.payload,
        offers: getOffersByCity(action.payload.name)
      });
    case ActionType.CHANGE_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
