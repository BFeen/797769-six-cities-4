import NameSpace from "../name-space.js";


export const getCurrentCity = (state) => {
  return state[NameSpace.APPLICATION].currentCity;
};

// export const getCurrentOffer = (state) => {
//   return state[NameSpace.APPLICATION].currentOffer;
// };

export const getSortType = (state) => {
  return state[NameSpace.APPLICATION].sortType;
};
