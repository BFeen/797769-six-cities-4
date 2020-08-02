const AVATAR_URL = `https://api.adorable.io/avatars/128`;

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

const LoginClassNames = {
  AUTHORIZED: `header__user-name user__name`,
  NO_AUTHORIZED: `header__login`, 
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

export {cities, MapClassNames, LoginClassNames, AVATAR_URL, SortType};
