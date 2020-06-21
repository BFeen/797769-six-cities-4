import React from "react";
import PropTypes from "prop-types";


const PlaceCard = (props) => {
  const {offer, onCardMouseEnter, onCardTitleClick} = props;

  return (      
    <article className="cities__place-card place-card"
      onMouseEnter={(evt) => {
        onCardMouseEnter(evt.target);
      }}
    >
      {offer.isPremium ? 
      <div className="place-card__mark">
        <span>Premium</span>
      </div> 
      : 
      ``}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.picture} width="260" height="200" alt={offer.description} />
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
            <span style={{width: `80%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 
          className="place-card__name"
          onClick={onCardTitleClick}
        >
          <a href="#">{offer.description}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>  
    </article>
    );
};

PlaceCard.propTypes = {
  offer: PropTypes.shape({
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.oneOf([`Apartment`,`Room`,`House`,`Hotel`]).isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

export default PlaceCard;
