import {reducer, ActionType, ActionCreator} from "./reducer.js";
import {offers} from "./mocks/offers.js";


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

describe(`Reducer testing`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      offerId: -1,
      city: `Amsterdam`,
      offers,
    });
  });
  
  it(`Reducer should assign given value`, () => {
    expect(reducer({
      offerId: -1,
      city: `Amsterdam`,
      offersMock,
    }, {
      type: ActionType.SELECT_OFFER,
      payload: 2,
    })).toEqual({
      offerId: 2,
      city: `Amsterdam`,
      offersMock,
    });

    expect(reducer({
      offerId: -1,
      city: `Amsterdam`,
      offersMock,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `Moscow`,
    })).toEqual({
      offerId: -1,
      city: `Moscow`,
      offersMock,
    });
    
    expect(reducer({
      offerId: -1,
      city: `Amsterdam`,
      offers: offersMock,
    }, {
      type: ActionType.GET_OFFERS,
      payload: offerMock,
    })).toEqual({
      offerId: -1,
      city: `Amsterdam`,
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
    expect(ActionCreator.changeCity(`Moscow`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Moscow`,
    });
  });

  it(`ActionCreator for getting offers returns correct action`, () => {
    expect(ActionCreator.getOffers(`Amsterdam`)).toEqual({
      type: ActionType.GET_OFFERS,
      payload: offersMock,
    })
  });
});