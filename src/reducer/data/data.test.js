import {reducer, Operation, ActionType} from "./data.js";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";

const offersMock = [
  {
    id: 0,
    city: `Amsterdam`,
    title: `Beautiful & luxurious apartment at great location`,
    picture: `img/apartment-01.jpg`,
    isPremium: true,
    price: 200,
    type: `Apartment`,
    rating: 4,
    coordinates: [
      52.3909553943508,
      4.85309666406198
    ],
  }, {
    id: 1,
    city: `Amsterdam`,
    title: `Wood and stone place`,
    picture: `img/apartment-03.jpg`,
    isPremium: true,
    price: 170,
    type: `House`,
    rating: 5,
    coordinates: [
      52.369553943508,
      4.85309666406198
    ]
  }, {
    id: 2,
    city: `Amsterdam`,
    title: `Canal view Princengracht`,
    picture: `img/room.jpg`,
    isPremium: false,
    price: 70,
    type: `Room`,
    rating: 3,
    coordinates: [
      52.3909553943508,
      4.929309666406198
    ]
  }, {
    id: 3,
    city: `Amsterdam`,
    title: `Nice, cozy, warm big bed apartment`,
    picture: `img/apartment-02.jpg`,
    isPremium: false,
    price: 150,
    type: `Apartment`,
    rating: 4,
    coordinates: [
      52.3809553943508,
      4.939309666406198
    ]
  }
];

const nearbyOffersMock = offersMock.slice(3);

const reviewsMock = [
  {
    offerId: 0,
    userName: `Max`,
    userAvatar: `img/avatar-max.jpg`,
    rating: 4,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    dateTime: `April 2014`
  }, {
    offerId: 1,
    userName: `John`,
    userAvatar: `${AVATAR_URL}/3`,
    rating: 5,
    description: `Best place of the world!`,
    dateTime: `December 2012`
  }, {
    offerId: 2,
    userName: `Mr. X`,
    userAvatar: `${AVATAR_URL}/4`,
    rating: 1,
    description: `The worst place of the world!`,
    dateTime: `June 2020`
  }, {
    offerId: 3,
    userName: `Leela Turanga`,
    userAvatar: `${AVATAR_URL}/5`,
    rating: 3,
    description: `Nice. But too many roaches.`,
    dateTime: `May 3001`
  }
];

const api = createAPI(() => {});

describe(`Data reducer testing`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      offers: [],
      nearbyOffers: [],
      reviews: [],
    });
  });

  it(`Reducer should update offers by load offers`, () => {
    expect(reducer({
      offers: [],
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: offersMock,
    })).toEqual({
      offersMock,
    });
  });

  it(`Reducer should update reviews by load reviews`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: reviewsMock,
    })).toEqual({
      reviewsMock,
    });
  });

  it(`Reducer should update nearbyOffers by load nearby offers`, () => {
    expect(reducer({
      nearbyOffers: [],
    }, {
      type: ActionType.LOAD_NEARBY,
      payload: nearbyOffersMock,
    })).toEqual({
      nearbyOffers: nearbyOffersMock,
    });
  });
});

describe(`Data Operation work correctly`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  it(`Should make a correct API call to '/hotels'`, () => {
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to '/comments/:hotel-id'`, () => {
    const reviewsLoader = Operation.loadReviews();

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to '/hotels/:hotel-id/nearby'`, () => {
    const nearbyOffersLoader = Operation.loadNearby();

    apiMock
      .onGet(`/hotels/1/nearby`)
      .reply(200, [{fake: true}]);

    return nearbyOffersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_NEARBY,
          payload: [{fake: true}],
        });
      });
  });
});
