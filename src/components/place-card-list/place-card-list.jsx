import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import withActiveCard from "../../hocs/with-active-card/with-active-card.js";


const PlaceCardWrapped = withActiveCard(PlaceCard);

const PlaceCardList = (props) => {
  const {offers, onCardTitleClick, isMain} = props;
  const listClassName = isMain ? `cities__places-list tabs__content` : `near-places__list`;
  const cardClassName = isMain ? `cities__place-card` : `near-places__card`;

  return (
    <div className={`places__list ${listClassName}`}>
      {offers.map((offer) => {
        return (
          <PlaceCardWrapped
            key={`${offer.id}`}
            offer={offer}
            className={cardClassName}
            onCardTitleClick={onCardTitleClick}
          />
        );
      })}
    </div>
  );
}

PlaceCardList.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  isMain: PropTypes.bool.isRequired,
};

export default PlaceCardList;
