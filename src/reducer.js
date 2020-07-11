import {extend} from "./common/utils.js";
import {cities} from "./common/const.js";
import {offers} from "./mocks/offers.js";


const initialState = {
  offerId: -1,
  city: cities[0].name,
  offers,
};

const ActionType = {
  SELECT_OFFER: `SELECT_OFFER`,
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
};

const ActionCreator = {
  selectOffer: (offerId) => ({
    type: ActionType.SELECT_OFFER,
    payload: offerId,
  }),

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
    case ActionType.SELECT_OFFER:
      return extend(state, {
        offerId: action.payload,
      });
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
