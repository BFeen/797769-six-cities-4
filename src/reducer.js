import {extend} from "./common/utils.js";
import {cities} from "./common/const.js";
import {offers} from "./mocks/offers.js";


const initialState = {
  city: cities[3].name,
  offers,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
};

const ActionCreator = {
  changeCity: (cityName) => ({
    type: ActionType.CHANGE_CITY,
    payload: cityName,
  }),

  getOffers: (cityName) => {
    const offersByCity = offers.filter((offer) => offer.city === cityName);

    return {
      type: ActionType.GET_OFFERS,
      payload: offersByCity,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.GET_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
  }

  return state;
}

export {reducer, ActionType, ActionCreator};
