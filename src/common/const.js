const ScreenMode = {
  MAIN: `MAIN`,
  DETAILS: `DETAILS`,
  FAVORITES: `FAVORITES`,
  SIGN_IN: `SIGN_IN`,
};

const Cities = [
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

const ClassNames = {
  MapClassNames: {
    CITIES: `cities`,
    PROPERTY: `property`,
  },
  LoginClassNames: {
    AUTH: `header__user-name user__name`,
    NO_AUTH: `header__login`,
  },
  CitiesListClassNames: {
    MAIN: `cities__places-list tabs__content`,
    DETAILS: `near-places__list`,
  },
  CardClassNames: {
    MAIN: `cities__place-card`,
    DETAILS: `near-places__card`,
  },
  PageClassNames: {
    MAIN: `page--gray page--main`,
    SIGN_IN: `page--gray page--login`,
    DETAILS: ``,
  }
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

const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

export {Cities, ClassNames, ScreenMode, SortType, MONTHS};
