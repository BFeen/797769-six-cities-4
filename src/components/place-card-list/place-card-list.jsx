import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";
import offerPropTypes from "../../prop-types/offer-prop-types.js";


const PlaceCardList = (props) => {
  const {
    offers,
    onItemClick,
    isMain,
    onCardMouseEnter,
    onCardMouseLeave,
  } = props;
  const listClassName = isMain ? `cities__places-list tabs__content` : `near-places__list`;
  const cardClassName = isMain ? `cities__place-card` : `near-places__card`;

  return (
    <div className={`places__list ${listClassName}`}>
      {offers.map((offer) => {
        return (
          <PlaceCard
            key={`${offer.id}`}
            offer={offer}
            className={cardClassName}
            onItemClick={onItemClick}
            onCardMouseEnter={onCardMouseEnter}
            onCardMouseLeave={onCardMouseLeave}
          />
        );
      })}
    </div>
  );
};

PlaceCardList.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  onItemClick: PropTypes.func.isRequired,
  isMain: PropTypes.bool.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
};

export default PlaceCardList;
