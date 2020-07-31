import {reducer, Operation, ActionType} from "./data.js";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";


const offersMock = [
  {
    id: 0,
    type: `apartment`,
    city: `Amsterdam`,
    title: `Beautiful & luxurious apartment at great location`,
    picture: `img/apartment-01.jpg`,
    price: 200,
    isPremium: true,
    isFavorite: false,
    rating: 4,
    coordinates: [
      52.3909553943508,
      4.85309666406198
    ],
    details: {
      description: `A quiet cozy and picturesque that hides behind a a river...`,
      bedroomsCount: 3,
      pictures: [
        `img/apartment-01.jpg`,
        `img/room.jpg`,
      ],
      maxGuests: 4,
      insideItems: [
        `Wi-Fi`,
        `Heating`,
        `Kitchen`,
      ],
      host: {
        id: 0,
        avatar: `img/avatar-angelina.jpg`,
        name: `Angelina`,
        isPro: true,
      }
    }
  }, {
    id: 1,
    type: `house`,
    city: `Amsterdam`,
    title: `Wood and stone place`,
    picture: `img/apartment-03.jpg`,
    price: 170,
    isPremium: true,
    isFavorite: false,
    rating: 5,
    coordinates: [
      52.369553943508,
      4.85309666406198
    ],
    details: {
      description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`,
      bedroomsCount: 3,
      pictures: [
        `img/room.jpg`,
        `img/apartment-02.jpg`,
      ],
      maxGuests: 4,
      insideItems: [
        `Wi-Fi`,
        `Heating`,
        `Kitchen`,
        `Washing machine`,
      ],
      host: {
        id: 1,
        avatar: `img/avatar-max.jpg`,
        name: `Max`,
        isPro: true,
      }
    }
  }, {
    id: 2,
    city: `Amsterdam`,
    title: `Canal view Princengracht`,
    picture: `img/room.jpg`,
    isPremium: false,
    isFavorite: true,
    price: 70,
    type: `room`,
    rating: 3,
    coordinates: [
      52.3909553943508,
      4.929309666406198
    ],
    details: {
      description: `Eligendi repellendus ut optio ad repudiandae`,
      bedroomsCount: 2,
      pictures: [
        `img/apartment-02.jpg`,
        `img/apartment-03.jpg`,
      ],
      maxGuests: 2,
      insideItems: [
        `Wi-Fi`,
        `Kitchen`,
        `Friddge`,
      ],
      host: {
        id: 2,
        avatar: `avatar.jpg`,
        name: `Alessa`,
        isPro: false,
      }
    }
  }, {
    id: 3,
    city: `Amsterdam`,
    title: `Nice, cozy, warm big bed apartment`,
    picture: `img/apartment-02.jpg`,
    isPremium: false,
    isFavorite: true,
    price: 150,
    type: `apartment`,
    rating: 4,
    coordinates: [
      52.3809553943508,
      4.939309666406198
    ],
    details: {
      description: `Quia labore atque nostrum eum repudiandae laboriosam`,
      bedroomsCount: 1,
      pictures: [
        `img/studio-01.jpg`,
        `img/apartment-01.jpg`,
      ],
      maxGuests: 2,
      insideItems: [
        `Wi-Fi`,
        `Kitchen`,
        `Friddge`,
        `Cabel TV`,
      ],
      host: {
        id: 3,
        avatar: `avatar-2.jpg`,
        name: `Kristian`,
        isPro: false,
      }
    }
  }
];

const nearbyOffersMock = offersMock.slice(0, 3);

const reviewsMock = [
  {
    id: 0,
    comment: `A quiet cozy and picturesque that...`,
    dateTime: `April 2014`,
    rating: 4,
    user: {
      id: 0,
      name: `Max`,
      avatar: `img/avatar-max.jpg`,
      isPro: true,
    }
  }, {
    id: 1,
    comment: `Best place of the world!`,
    dateTime: `December 2012`,
    rating: 5,
    user: {
      id: 1,
      name: `John`,
      avatar: `https://api.adorable.io/avatars/128/5`,
      isPro: true,
    }
  }, {
    id: 2,
    comment: `The worst place of the world!`,
    dateTime: `June 2020`,
    rating: 1,
    user: {
      id: 2,
      name: `Mr. X`,
      avatar: `https://api.adorable.io/avatars/128/6`,
      isPro: false,
    }
  }, {
    id: 3,
    comment: `Nice. But too many roaches.`,
    dateTime: `May 3001`,
    rating: 3,
    user: {
      id: 3,
      name: `Leela Turanga`,
      avatar: `https://api.adorable.io/avatars/128/7`,
      isPro: false,
    }
  },
];

const offerRaw = [{
  "bedrooms": 3,
  "city": {
    "location": {
      "latitude": 52.3909553943508,
      "longitude": 4.85309666406198,
      "zoom": 10
    },
    "name": `Amsterdam`
  },
  "description": `A quiet cozy and picturesque that hides behind a a river...`,
  "goods": [`Wi-Fi`, `Heating`, `Kitchen`],
  "host": {
    "avatar_url": `img/avatar-angelina.jpg`,
    "id": 0,
    "is_pro": true,
    "name": `Angelina`
  },
  "id": 0,
  "images": [
    `img/apartment-01.jpg`,
    `img/room.jpg`],
  "is_favorite": false,
  "is_premium": true,
  "location": {
    "latitude": 52.3909553943508,
    "longitude": 4.85309666406198,
    "zoom": 8
  },
  "max_adults": 4,
  "preview_image": `img/apartment-01.jpg`,
  "price": 200,
  "rating": 4,
  "title": `Beautiful & luxurious apartment at great location`,
  "type": `apartment`
}];

const reviewRaw = [{
  "comment": `A quiet cozy and picturesque that...`,
  "date": `April 2014`,
  "id": 0,
  "rating": 4,
  "user": {
    "avatar_url": `img/avatar-max.jpg`,
    "id": 0,
    "is_pro": true,
    "name": `Max`
  }
}];

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
      offers: offersMock,
    });
  });

  it(`Reducer should update reviews by load reviews`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: reviewsMock,
    })).toEqual({
      reviews: reviewsMock,
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
  it(`Should make a correct API call to '/hotels'`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, offerRaw);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [offersMock[0]],
        });
      });
  });

  it(`Should make a correct API call to '/hotels/:hotel-id/nearby'`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 0;
    const nearbyOffersLoader = Operation.loadNearby(offerId);

    apiMock
      .onGet(`/hotels/${offerId}/nearby`)
      .reply(200, offerRaw);

    return nearbyOffersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_NEARBY,
          payload: [offersMock[0]],
        });
      });
  });

  it(`Should make a correct API call to '/comments/:hotel-id'`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerId = 0;
    const reviewsLoader = Operation.loadReviews(offerId);

    apiMock
      .onGet(`/comments/${offerId}`)
      .reply(200, reviewRaw);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [reviewsMock[0]],
        });
      });
  });
});
