import {createSelector} from "reselect";
import {getCurrentCity} from "../application/selectors.js";
import {parseOffers, parseReviews} from "../adapters.js";
import NameSpace from "../name-space.js";


export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getOffersByCity = createSelector(
  getOffers,
  getCurrentCity,
  (offersList, currentCity) => {
    return offersList.filter((offer) => offer.city === currentCity.name);
  }
);

export const getNearbyOffers = (state) => {
  return state[NameSpace.DATA].nearbyOffers;
};

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};
