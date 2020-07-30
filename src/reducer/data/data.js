import {extend} from "../../common/utils.js";
import {offerAdapter, reviewAdapter} from "../adapters.js";


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
        return response.data.map((item) => offerAdapter(item));
      })
      .then((offers) => {
        dispatch(ActionCreator.loadOffers(offers));
      });
  },

  loadNearby: (offerId) => (dispatch, getState, api) => {
    if (offerId < 0) {
      return [];
    }

    return api.get(`/hotels/${offerId}/nearby`)
      .then((response) => {
        return response.data.map((item) => offerAdapter(item));
      })
      .then((nearbyOffers) => {
        dispatch(ActionCreator.loadNearby(nearbyOffers));
      });
  },

  loadReviews: (offerId) => (dispatch, getState, api) => {
    if (offerId < 0) {
      return [];
    }

    return api.get(`/comments/${offerId}`)
      .then((response) => {
        return response.data.map((item) => reviewAdapter(item));
      })
      .then((reviews) => {
        dispatch(ActionCreator.loadReviews(reviews));
      });
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
