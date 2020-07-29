import {extend} from "../../common/utils.js";


const initialState = {
  offers: [],
  nearbyOffers: [],
  reviews: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_NEARBY: `LOAD_NEARBY`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
  loadNearby: (nearbyOffers) => {
    return {
      type: ActionType.LOAD_NEARBY,
      payload: nearbyOffers,
    }
  },
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      });
      // catch ?
  },

  loadNearby: (offerId) => (dispatch, getState, api) => {
    return api.get(`/hotels/${offerId}/nearby`)
      .then((response) => {
        dispatch(ActionCreator.loadNearby(response.data));
      });
      // catch ?
  },

  loadReviews: (offerId) => (dispatch, getState, api) => {
    return api.get(`/comments/${offerId}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
      });
      // catch ?
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.LOAD_NEARBY:
      return extend(state, {
        nearbyOffers: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
