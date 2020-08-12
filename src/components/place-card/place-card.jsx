import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import {getSlicedClassName, getRatingStars} from "../../common/utils.js";
import {AppRoute} from "../../common/const.js";


const PlaceCard = (props) => {
  const {
    offer,
    className,
    isFavoriteScreen,
    onCardMouseEnter,
    onCardMouseLeave,
    onItemClick,
    onBookmarkClick,
  } = props;

  const {rating, isFavorite} = offer;
  const ratingStarsLength = getRatingStars(rating);
  const slicedClassName = getSlicedClassName(className);
  const infoClassName = isFavoriteScreen ? `favorites__card-info` : ``;
  const btnBookmarkClass = isFavorite ? `place-card__bookmark-button--active` : ``;

  return (
    <article
      className={`${className} place-card`}
      onMouseEnter={() => {
        onCardMouseEnter(offer);
      }}
      onMouseLeave={() => {
        onCardMouseLeave();
      }}
    >
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className={`${slicedClassName}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.DETAILS}/${offer.id}`}>
          <img className="place-card__image" src={offer.picture} width="260" height="200" alt={offer.title} />
        </Link>
      </div>
      <div className={`place-card__info ${infoClassName}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button
            className={`place-card__bookmark-button ${btnBookmarkClass} button`}
            type="button"
            onClick={() => {
              onBookmarkClick(offer.id, offer.isFavorite);
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingStarsLength}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2
          className="place-card__name"
          onClick={() => {
            onItemClick(offer);
          }}
        >
          <Link to={`${AppRoute.DETAILS}/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: offerPropTypes,
  className: PropTypes.string.isRequired,
  isFavoriteScreen: PropTypes.bool.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
};

export default PlaceCard;
