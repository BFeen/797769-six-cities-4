import NameSpace from "../name-space.js";
// import {createSelector} from "reselect";
// import {getOffers} from "../data/selectors.js";


export const getCurrentCity = (state) => {
  return state[NameSpace.APPLICATION].currentCity;
};

// export const getCitiesList = createSelector(
//   getOffers,
//   (offers) => {
//     return [...new Set(offers.map((offer) => offer.city))];
//   }
// );

// export const getCurrentOffer = (state) => {
//   return state[NameSpace.APPLICATION].currentOffer;
// };

export const getSortType = (state) => {
  return state[NameSpace.APPLICATION].sortType;
};
