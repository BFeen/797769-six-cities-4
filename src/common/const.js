const AVATAR_URL = `https://api.adorable.io/avatars/128`;

const cities = [
  {
    name: `Paris`,
    isActive: true,
    coordinates: [],
  }, {
    name: `Cologne`,
    isActive: false,
    coordinates: [],
  }, {
    name: `Brussels`,
    isActive: false,
    coordinates: [],
  }, {
    name: `Amsterdam`,
    isActive: false,
    coordinates: [52.38333, 4.9],
  }, {
    name: `Hamburg`,
    isActive: false,
    coordinates: [],
  }, {
    name: `Dusseldorf`,
    isActive: false,
    coordinates: [],
  }
]

const MapClassNames = {
  CITIES: `cities`,
  PROPERTY: `property`,
};

export {cities, MapClassNames, AVATAR_URL};
