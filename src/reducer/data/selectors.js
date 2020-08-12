import {createSelector} from "reselect";
import {getCurrentCity} from "../application/selectors.js";
import NameSpace from "../name-space.js";


export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getOffersByCity = createSelector(
    getOffers,
    getCurrentCity,
    (offersList, currentCity) => {
      return offersList.filter((offer) => offer.city.name === currentCity.name);
    }
);

export const getNearbyOffers = (state) => {
  return state[NameSpace.DATA].nearbyOffers;
};

export const getNearbyFromOffers = createSelector(
    getOffers,
    getNearbyOffers,
    (offersAll, nearby) => {
      return nearby.map((item) => {
        return offersAll.find((offer) => offer.id === item);
      });
    }
);

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

export const getError = (state) => {
  return state[NameSpace.DATA].errorMessage;
};

export const getFavorites = (state) => {
  return state[NameSpace.DATA].favorites;
};
