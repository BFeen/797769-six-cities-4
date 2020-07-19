import {SortType} from "./const.js";


const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const getSortedOffers = (unsortedOffers, sortType) => {
  const offers = unsortedOffers.slice();

  switch (sortType) {
    case SortType.LOW_TO_HIGH.value:
      return offers
        .sort((a, b) => a.price - b.price);
    case SortType.HIGH_TO_LOW.value:
      return offers
        .sort((a, b) => b.price - a.price);
    case SortType.RATING.value:
      return offers
        .sort((a, b) => a.rating - b.rating);
  }

  return offers;
};

export {extend, getSortedOffers};
