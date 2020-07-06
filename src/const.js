const AVATAR_URL = `https://api.adorable.io/avatars/128`;

const generateAvatar = () => {
  return `${AVATAR_URL}/${Math.random()}`
};

const CITIES = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`,
];

const MapClassNames = {
  CITIES: `cities`,
  PROPERTY: `property`,
};

export {CITIES, MapClassNames, generateAvatar};
