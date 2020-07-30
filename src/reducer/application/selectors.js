import NameSpace from "../name-space.js";


export const getCurrentCity = (state) => {
  return state[NameSpace.APPLICATION].currentCity;
};

export const getOfferId = (state) => {
  return state[NameSpace.APPLICATION].offerId;
};

export const getSortType = (state) => {
  return state[NameSpace.APPLICATION].sortType;
};
