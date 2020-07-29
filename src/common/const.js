const AVATAR_URL = `https://api.adorable.io/avatars/128`;

const getOffersByCity = (offersList, cityName) => {
  return offersList.filter((offer) => offer.city === cityName);
};

const cities = [
  {
    name: `Paris`,
    coordinates: [48.85, 2.34],
  }, {
    name: `Cologne`,
    coordinates: [50.93, 6.95],
  }, {
    name: `Brussels`,
    coordinates: [50.84, 4.35],
  }, {
    name: `Amsterdam`,
    coordinates: [52.38333, 4.9],
  }, {
    name: `Hamburg`,
    coordinates: [53.55, 9.99],
  }, {
    name: `Dusseldorf`,
    coordinates: [51.22, 6.77],
  }
];

const MapClassNames = {
  CITIES: `cities`,
  PROPERTY: `property`,
};

const SortType = {
  POPULAR: {
    value: `popular`,
    name: `Popular`,
  },
  LOW_TO_HIGH: {
    value: `to-high`,
    name: `Price: low to high`,
  },
  HIGH_TO_LOW: {
    value: `to-low`,
    name: `Price: high to low`,
  },
  RATING: {
    value: `top-rated`,
    name: `Top rated first`,
  },
};

export {cities, MapClassNames, AVATAR_URL, SortType, getOffersByCity};
