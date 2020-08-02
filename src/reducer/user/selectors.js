import NameSpace from "../name-space.js";


export const getAuthorizationStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

export const getUserData = (state) => {
  return state[NameSpace.USER].user;
}
