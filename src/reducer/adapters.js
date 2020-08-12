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

const nearbyOfferAdapter = (nearbyOffer) => {
  return nearbyOffer[`id`];
};

const reviewAdapter = (review) => {
  const user = review[`user`];

  return {
    id: review[`id`],
    comment: review[`comment`],
    dateTime: new Date(review[`date`]),
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

const parseNearbyOffers = (nearbyOffers) => {
  return nearbyOffers.map((item) => nearbyOfferAdapter(item));
};

const parseOffers = (offers) => {
  return offers.map((item) => offerAdapter(item));
};

const parseReviews = (reviews) => {
  const adaptedReviews = reviews.map((item) => reviewAdapter(item));
  return adaptedReviews.sort((a, b) => b.dateTime - a.dateTime);
};

export {
  offerAdapter,
  reviewAdapter,
  userDataAdapter,
  parseOffers,
  parseReviews,
  parseNearbyOffers,
};
