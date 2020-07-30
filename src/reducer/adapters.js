const offerAdapter = (offer) => {
  const offerLocation = Object.values(offer['location']).slice(0,2);
  const host = offer['host'];
  
  return {
    id: offer['id'],
    type: offer['type'],
    city: offer['city']['name'],
    title: offer['title'],
    picture: offer['preview_image'],
    price: offer['price'],
    isPremium: offer['is_premium'],
    isFavorite: offer['is_favorite'],
    rating: offer['rating'],
    coordinates: offerLocation,
    details: {
      description: offer['description'],
      bedroomsCount: offer['bedrooms'],
      pictures: offer['images'],
      maxGuests: offer['max_adults'],
      insideItems: offer['goods'],
      host: {
        id: host['id'],
        avatar: host['avatar_url'],
        name: host['name'],
        isPro: host['is_pro'],
      }
    }
  }
};

const reviewAdapter = (review) => {
  const user = review['user'];

  return {
    id: review['id'],
    comment: review['comment'],
    dateTime: review['date'],
    rating: review['rating'],
    user: {
      id: user['id'],
      name: user['name'],
      avatar: user['avatar_url'],
      isPro: user['is_pro'],
    }
  }
}

export {offerAdapter, reviewAdapter};
