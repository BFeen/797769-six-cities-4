import React from "react";
import PropTypes from "prop-types";
import offerPropTypes from "../../prop-types/offer-prop-types.js";


const PlaceCard = (props) => {
  const {
    offer,
    className,
    onCardMouseEnter,
    onCardMouseLeave,
    onItemClick,
  } = props;
  const {rating} = offer;
  const ratingStarsLength = 20 * rating + `%`;

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

      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={offer.picture} width="260" height="200" alt={offer.title} />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
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
            onItemClick(offer.id);
          }}
        >
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: offerPropTypes,
  className: PropTypes.string.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default PlaceCard;
