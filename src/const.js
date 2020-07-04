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

export {CITIES, generateAvatar};
