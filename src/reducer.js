import {extend} from "./common/utils.js";
import {cities} from "./common/const.js";
import {offers} from "./mocks/offers.js";


const getOffersByCity = (cityName) => {
  return offers.filter((offer) => offer.city === cityName);
};

const startingCity = cities[0];

const initialState = {
  offerId: -1,
  city: startingCity,
  offers: getOffersByCity(startingCity.name),
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

  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity,
  }),

  getOffers: (cityName) => {
    return {
      type: ActionType.GET_OFFERS,
      payload: getOffersByCity(cityName),
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
        offers: getOffersByCity(action.payload.name)
      });
    case ActionType.GET_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
  }

  return state;
}

export {reducer, ActionType, ActionCreator};
