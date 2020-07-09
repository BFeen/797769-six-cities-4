import {extend} from "./common/utils.js";


const initialState = {
  offerId: -1,
};

const ActionType = {
  CHANGE_OFFER_ID: `CHANGE_OFFER_ID`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_OFFER_ID:
      return extend(state, {
        offerId: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType};
