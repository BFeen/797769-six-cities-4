import {extend} from "../../common/utils.js";
import {parseOffers, parseReviews, parseNearbyOffers} from "../adapters.js";
import {getOffers} from "./selectors.js";

const initialState = {
  offers: [],
  nearbyOffers: [],
  favorites: [],
  reviews: [],
  errorMessage: ``,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_NEARBY: `LOAD_NEARBY`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  CATCH_ERROR: `CATCH_ERROR`,
  RESET_ERROR: `RESET_ERROR`
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
  loadFavorites: (favorites) => {
    return {
      type: ActionType.LOAD_FAVORITES,
      payload: favorites,
    };
  },
  catchError: (error) => {
    return {
      type: ActionType.CATCH_ERROR,
      payload: error,
    };
  },
  resetError: () => {
    return {
      type: ActionType.RESET_ERROR,
      payload: ``,
    };
  }
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(parseOffers(response.data)));
        dispatch(ActionCreator.resetError());
      })
      .catch((err) => {
        dispatch(ActionCreator.catchError(err.message));
        throw err;
      });
  },
  loadNearby: (offerId) => (dispatch, getState, api) => {
    if (offerId < 0) {
      return [];
    }

    return api.get(`/hotels/${offerId}/nearby`)
      .then((response) => {
        dispatch(ActionCreator.loadNearby(parseNearbyOffers(response.data)));
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
        throw err;
      });
  },
  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavorites(parseOffers(response.data)));
      })
      .catch((err) => {
        throw err;
      });
  },
  postFavorites: (offerId, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${offerId}/${status}`)
      .then(() => {
        const state = getState();
        const offers = getOffers(state).slice();
        const changingOffer = offers.find((item) => item.id === offerId);
        changingOffer.isFavorite = !changingOffer.isFavorite;

        dispatch(ActionCreator.loadOffers(offers));
        dispatch(Operation.loadFavorites());
      })
      .catch((err) => {
        throw err;
      });
  }
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
    case ActionType.LOAD_FAVORITES:
      return extend(state, {
        favorites: action.payload,
      });
    case ActionType.CATCH_ERROR:
      return extend(state, {
        errorMessage: action.payload,
      });
    case ActionType.RESET_ERROR:
      return extend(state, {
        errorMessage: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
