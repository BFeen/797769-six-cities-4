import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ReviewItemList from "../review-item-list/review-item-list.jsx";
import PlaceCardList from "../place-card-list/place-card-list.jsx";
import Map from "../map/map.jsx";
import Header from "../header/header.jsx";
import ReviewForm from "../review-form/review-form.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import withReview from "../../hocs/with-review/with-review.js";
import {getReviews, getNearbyFromOffers} from "../../reducer/data/selectors.js";
import {Operation} from "../../reducer/data/data.js";
import {ClassNames, ScreenType} from "../../common/const.js";
import {getRatingStars} from "../../common/utils.js";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import reviewPropTypes from "../../prop-types/review-prop-types.js";


const PlaceCardListWrapped = withActiveItem(PlaceCardList);
const ReviewFormWrapped = withReview(ReviewForm);

class PlaceDetails extends PureComponent {
  componentDidMount() {
    const {currentOffer, loadReviews, loadNearbyOffers} = this.props;

    loadReviews(currentOffer.id);
    loadNearbyOffers(currentOffer.id);
  }

  render() {
    const {
      currentOffer,
      nearbyOffers,
      reviews,
      onCardTitleClick,
      onCardMouseEnter,
      onCardMouseLeave,
      activeCard,
      isAuthorized,
      onBookmarkClick,
    } = this.props;

    const {details, rating, isFavorite} = currentOffer;
    const {host} = details;
    const {MapClassNames} = ClassNames;

    const ratingStarsLength = getRatingStars(rating);
    const bookmarkActiveClass = isFavorite ? `property__bookmark-button--active` : ``;
    const hostProClass = host.isPro ? `property__avatar-wrapper--pro` : ``;

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
                  <button
                    className={`property__bookmark-button ${bookmarkActiveClass} button`}
                    type="button"
                    onClick={() => {
                      onBookmarkClick(currentOffer.id, isFavorite);
                    }}
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: ratingStarsLength}}></span>
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
                    <div className={`property__avatar-wrapper ${hostProClass} user__avatar-wrapper`}>
                      <img className="property__avatar user__avatar" src={`/${host.avatar}`} width="74" height="74" alt="Host avatar" />
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

                  {isAuthorized &&
                  <ReviewFormWrapped
                    offerId={currentOffer.id}
                  />}

                </section>
              </div>
            </div>
            <Map
              city={currentOffer.city}
              offers={nearbyOffers}
              activeCard={activeCard}
              mapClassName={MapClassNames.PROPERTY}
            />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <PlaceCardListWrapped
                offers={nearbyOffers}
                screenType={ScreenType.DETAILS}
                onItemClick={onCardTitleClick}
                onCardMouseEnter={onCardMouseEnter}
                onCardMouseLeave={onCardMouseLeave}
                onBookmarkClick={onBookmarkClick}
              />

            </section>
          </div>
        </main>
      </div>
    );
  }
}

PlaceDetails.propTypes = {
  currentOffer: offerPropTypes,
  nearbyOffers: PropTypes.arrayOf(offerPropTypes).isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  activeCard: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  loadNearbyOffers: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
  nearbyOffers: getNearbyFromOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadNearbyOffers: (offerId) => {
    dispatch(Operation.loadNearby(offerId));
  },
  loadReviews: (offerId) => {
    dispatch(Operation.loadReviews(offerId));
  }
});

export {PlaceDetails};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);
