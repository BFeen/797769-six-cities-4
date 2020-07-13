const AVATAR_URL = `https://api.adorable.io/avatars/128`;

const cities = [
  {
    name: `Paris`,
    isActive: true,
    coordinates: [48.8589507,2.2770201],
  }, {
    name: `Cologne`,
    isActive: false,
    coordinates: [50.9578353,6.8272391],
  }, {
    name: `Brussels`,
    isActive: false,
    coordinates: [50.8550625,4.3053502],
  }, {
    name: `Amsterdam`,
    isActive: false,
    coordinates: [52.38333, 4.9],
  }, {
    name: `Hamburg`,
    isActive: false,
    coordinates: [53.5586526,9.6476419],
  }, {
    name: `Dusseldorf`,
    isActive: false,
    coordinates: [51.2385861,6.674267],
  }
];

const MapClassNames = {
  CITIES: `cities`,
  PROPERTY: `property`,
};

export {cities, MapClassNames, AVATAR_URL};
