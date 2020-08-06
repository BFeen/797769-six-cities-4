import {extend} from "../../common/utils.js";
import {parseOffers, parseReviews} from "../adapters.js";


const initialState = {
  offers: [],
  nearbyOffers: [],
  reviews: [],
  errorMessage: ``,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_NEARBY: `LOAD_NEARBY`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  CATCH_ERROR: `CATCH_ERROR`
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
    };
  },
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
  catchError: (error) => {
    return {
      type: ActionType.CATCH_ERROR,
      payload: error,
    };
  },
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(parseOffers(response.data)));
      })
      .catch((err) => {
        dispatch(ActionCreator.catchError(err));
      });
  },

  loadNearby: (offerId) => (dispatch, getState, api) => {
    if (offerId < 0) {
      return [];
    }

    return api.get(`/hotels/${offerId}/nearby`)
      .then((response) => {
        dispatch(ActionCreator.loadNearby(parseOffers(response.data)));
      });
  },

  loadReviews: (offerId) => (dispatch, getState, api) => {
    if (offerId < 0) {
      return [];
    }

    return api.get(`/comments/${offerId}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(parseReviews(response.data)));
      });
  },
  
  postReview: (offerId, review) => (dispatch, getState, api) => {
    return api.post(`/comments/${offerId}`, {
      comment: review.comment,
      rating: review.rating,
    })
      .then((response) => {
        dispatch(ActionCreator.loadReviews(parseReviews(response.data)));
      })
      .catch((err) => {
        dispatch(ActionCreator.catchError(err));
  
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
    case ActionType.LOAD_NEARBY:
      return extend(state, {
        nearbyOffers: action.payload,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.CATCH_ERROR:
      return extend(state, {
        errorMessage: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
