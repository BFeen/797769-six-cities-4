import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import {ClassNames, ScreenType} from "../../common/const.js";


const PlaceCardList = (props) => {
  const {
    offers,
    onItemClick,
    screenType,
    onCardMouseEnter,
    onCardMouseLeave,
    onBookmarkClick,
  } = props;
  
  const listClassName = ClassNames.PlacesListClassNames[screenType];
  const cardClassName = ClassNames.CardClassNames[screenType];
  const isFavoriteScreen = screenType === ScreenType.FAVORITES;


  return (
    <div className={`places__list ${listClassName}`}>
      {offers.map((offer) => {
        return (
          <PlaceCard
            key={`${offer.id}`}
            offer={offer}
            className={cardClassName}
            isFavoriteScreen={isFavoriteScreen}
            onItemClick={onItemClick}
            onCardMouseEnter={onCardMouseEnter}
            onCardMouseLeave={onCardMouseLeave}
            onBookmarkClick={onBookmarkClick}
          />
        );
      })}
    </div>
  );
};

PlaceCardList.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  onItemClick: PropTypes.func.isRequired,
  screenType: PropTypes.string.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
};

export default PlaceCardList;
