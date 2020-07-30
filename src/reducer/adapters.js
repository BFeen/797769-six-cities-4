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
    location: offerLocation,
    details: {
      description: offer['description'], // был массив, теперь строка
      bedroomsCount: offer['bedrooms'], // number
      pictures: offer['images'], // array: string
      maxGuests: offer['max_adults'], // number
      insideItems: offer['goods'], // array: string
      host: {
        id: host['id'],
        avatar: host['avatar_url'],
        name: host['name'],
        isSuper: host['is_pro'],
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
    // следующие данные изменены
    user: {
      id: user['id'],
      name: user['name'],
      avatar: user['avatar_url'],
      isPro: user['is_pro'],
    }
  }
}

export {offerAdapter, reviewAdapter};
