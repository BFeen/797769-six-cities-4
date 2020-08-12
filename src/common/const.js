const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorite`,
  DETAILS: `/offer`,
};

const Cities = [
  {
    name: `Paris`,
    coordinates: [48.85, 2.34],
    zoom: 13,
  }, {
    name: `Cologne`,
    coordinates: [50.93, 6.95],
    zoom: 13,
  }, {
    name: `Brussels`,
    coordinates: [50.84, 4.35],
    zoom: 13,
  }, {
    name: `Amsterdam`,
    coordinates: [52.38333, 4.9],
    zoom: 13,
  }, {
    name: `Hamburg`,
    coordinates: [53.55, 9.99],
    zoom: 13,
  }, {
    name: `Dusseldorf`,
    coordinates: [51.22, 6.77],
    zoom: 13,
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
  PlacesListClassNames: {
    MAIN: `cities__places-list tabs__content`,
    DETAILS: `near-places__list`,
    FAVORITES: `favorites__places`,
  },
  CardClassNames: {
    MAIN: `cities__place-card`,
    DETAILS: `near-places__card`,
    FAVORITES: `favorites__card`,
  },
  ButtonClassNames: {
    SIGN_IN: `login__submit form__submit button`,
    REVIEW: `reviews__submit form__submit button`,
  },
};

const ScreenType = {
  MAIN: `MAIN`,
  DETAILS: `DETAILS`,
  FAVORITES: `FAVORITES`,
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

const RatingStarsCount = {
  FIVE: `perfect`,
  FOUR: `good`,
  THREE: `not bad`,
  TWO: `badly`,
  ONE: `terribly`,
};

const SortType = {
  POPULAR: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  RATING: `Top rated first`,
};

const ServerMessage = {
  [`400`]: `Server is not available`,
  [`401`]: `User unauthorized`,
};

export {
  AppRoute,
  Cities,
  ClassNames,
  MONTHS,
  RatingStarsCount,
  ScreenType,
  SortType,
  ServerMessage,
};
