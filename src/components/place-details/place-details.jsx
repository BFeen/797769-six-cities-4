import React from "react";
import PropTypes from "prop-types";
import ReviewItemList from "../review-item-list/review-item-list.jsx";
import PlaceCardList from "../place-card-list/place-card-list.jsx";
import Map from "../map/map.jsx";
import Header from "../header/header.jsx";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import reviewPropTypes from "../../prop-types/review-prop-types.js";
import cityPropTypes from "../../prop-types/city-prop-types.js";
import {connect} from "react-redux";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {getReviews, getNearbyOffers} from "../../reducer/data/selectors.js";
import {ClassNames} from "../../common/const.js";


const PlaceCardListWrapped = withActiveItem(PlaceCardList);

const PlaceDetails = (props) => {
  const {
    city,
    offers,
    offerId,
    nearbyOffers,
    reviews,
    onCardTitleClick,
    onCardMouseEnter,
    onCardMouseLeave,
    activeCard,
  } = props;

  const currentOffer = offers.find((item) => item.id === offerId);
  const {details} = currentOffer;
  const {host} = details;
  const {MapClassNames} = ClassNames;

  return (
    <div className="page">

      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">

              {details.pictures.map((picture, index) => {
                return (
                  <div key={`${picture + index}`} className="property__image-wrapper">
                    <img className="property__image" src={picture} alt={`Photo ${currentOffer.type}`} />
                  </div>
                );
              })}

            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">

              {currentOffer.isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `80%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${details.bedroomsCount} bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${details.maxGuests} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{currentOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {details.insideItems.map((item, index) => {
                    return (
                      <li key={`${item + index}`} className="property__inside-item">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatar} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {details.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">

                <ReviewItemList
                  reviews={reviews}
                />

                <form className="reviews__form form" action="#" method="post">
                  <label className="reviews__label form__label" htmlFor="review">Your review</label>
                  <div className="reviews__rating-form form__rating">
                    <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
                    <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
                    <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
                    <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
                    <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
                    <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>
                  </div>
                  <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                  <div className="reviews__button-wrapper">
                    <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                    </p>
                    <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <Map
            city={city}
            mapClassName={MapClassNames.PROPERTY}
            offers={nearbyOffers}
            activeCard={activeCard}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            <PlaceCardListWrapped
              offers={nearbyOffers}
              onItemClick={onCardTitleClick}
              isMain={false}
              onCardMouseEnter={onCardMouseEnter}
              onCardMouseLeave={onCardMouseLeave}
            />

          </section>
        </div>
      </main>
    </div>
  );
};

PlaceDetails.propTypes = {
  city: cityPropTypes,
  offerId: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  nearbyOffers: PropTypes.arrayOf(offerPropTypes).isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  activeCard: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
  nearbyOffers: getNearbyOffers(state),
});

export {PlaceDetails};
export default connect(mapStateToProps)(PlaceDetails);
