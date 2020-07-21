import {reducer, ActionType, ActionCreator} from "./reducer.js";


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
  },
];

const offerMock = {
  id: 4,
  city: `Vienne`,
  title: `Bla bla bla`,
  picture: `img/vienne-apartment.jpg`,
  isPremium: true,
  price: 500,
  type: `House`,
  rating: 5,
  coordinates: [
    52.3809392043508,
    4.93930248506198,
  ],
};

const citiesMock = [
  {
    name: `Paris`,
    coordinates: [48.85, 2.34],
  }, {
    name: `Amsterdam`,
    coordinates: [52.38333, 4.9],
  }, {
    name: `Dusseldorf`,
    coordinates: [51.22, 6.77],
  }
];

describe(`Reducer testing`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      offerId: -1,
      city: citiesMock[0],
      offers: [],
      sortType: `popular`,
    });
  });

  it(`Reducer should assign given value`, () => {
    expect(reducer({
      offerId: -1,
      city: citiesMock[1],
      offers: offersMock,
    }, {
      type: ActionType.SELECT_OFFER,
      payload: 2,
    })).toEqual({
      offerId: 2,
      city: citiesMock[1],
      offers: offersMock,
    });

    expect(reducer({
      offerId: -1,
      city: citiesMock[1],
      offers: offersMock,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: citiesMock[2],
    })).toEqual({
      offerId: -1,
      city: citiesMock[2],
      offers: [],
    });

    expect(reducer({
      offerId: -1,
      city: citiesMock[1],
      offers: offersMock,
    }, {
      type: ActionType.GET_OFFERS,
      payload: offerMock,
    })).toEqual({
      offerId: -1,
      city: citiesMock[1],
      offers: offerMock,
    });
  });
});

describe(`ActionCreator testing`, () => {
  it(`ActionCreator returns correct action when offerId is changed`, () => {
    expect(ActionCreator.selectOffer(2)).toEqual({
      type: ActionType.SELECT_OFFER,
      payload: 2,
    });
  });

  it(`ActionCreator for changing city should returns correct action`, () => {
    expect(ActionCreator.changeCity(citiesMock[2])).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: citiesMock[2],
    });
  });

  it(`ActionCreator for getting offers returns correct action`, () => {
    expect(ActionCreator.getOffers(citiesMock[1].name)).toEqual({
      type: ActionType.GET_OFFERS,
      payload: offersMock,
    });
  });
});
