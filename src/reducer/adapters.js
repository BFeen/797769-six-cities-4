const offerAdapter = (offer) => {
  const host = offer[`host`];
  const city = offer[`city`];
  const cityLocation = Object.values(city[`location`]).slice(0, 2);
  const offerLocation = Object.values(offer[`location`]).slice(0, 2);

  return {
    id: offer[`id`],
    type: offer[`type`],
    city: {
      name: city[`name`],
      coordinates: cityLocation,
      zoom: city[`location`][`zoom`],
    },
    title: offer[`title`],
    picture: offer[`preview_image`],
    price: offer[`price`],
    isPremium: offer[`is_premium`],
    isFavorite: offer[`is_favorite`],
    rating: offer[`rating`],
    coordinates: offerLocation,
    details: {
      description: offer[`description`],
      bedroomsCount: offer[`bedrooms`],
      pictures: offer[`images`],
      maxGuests: offer[`max_adults`],
      insideItems: offer[`goods`],
      host: {
        id: host[`id`],
        avatar: host[`avatar_url`],
        name: host[`name`],
        isPro: host[`is_pro`],
      }
    }
  };
};

const reviewAdapter = (review) => {
  const user = review[`user`];

  return {
    id: review[`id`],
    comment: review[`comment`],
    dateTime: review[`date`],
    rating: review[`rating`],
    user: {
      id: user[`id`],
      name: user[`name`],
      avatar: user[`avatar_url`],
      isPro: user[`is_pro`],
    }
  };
};

const userDataAdapter = (userData) => {
  return {
    id: userData[`id`],
    avatar: userData[`avatar_url`],
    email: userData[`email`],
    isPro: userData[`is_pro`],
    name: userData[`name`],
  };
};

const parseOffers = (offers) => {
  return offers.map((item) => offerAdapter(item));
};

const parseReviews = (reviews) => {
  return reviews.map((item) => reviewAdapter(item));
};

export {
  offerAdapter,
  reviewAdapter,
  userDataAdapter,
  parseOffers,
  parseReviews
};
