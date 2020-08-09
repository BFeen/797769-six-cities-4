import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Header from "../header/header.jsx";
import PlaceCard from "../place-card/place-card.jsx";
import PlaceCardList from "../place-card-list/place-card-list.jsx";
import {getFavorites} from "../../reducer/data/selectors.js";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import {AppRoute} from "../../common/const.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";


const PlaceCardListWrapped = withActiveItem(PlaceCardList);

const Favorites = (props) => {
  const {favorites, onCardTitleClick} = props;
  const citiesList = [... new Set(favorites.map((item) => item.city))];

  return(
    <div className="page">

      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ul className="favorites__list">

              {citiesList.map((city) => {
                const filteredCards = favorites.filter((item) => item.city === city);

                return (
                  <li className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#"> // ССЫЛКА
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>

                    <PlaceCardListWrapped
                      offers={filteredCards}
                      onItemClick={onCardTitleClick}
                      // isMain={false} // className={`favorites__places`}
                      onCardMouseEnter={() => {}}
                      onCardMouseLeave={() => {}}
                    />

                  </li>
                );
              })}
              <li className="favorites__locations-items">

                <div className="favorites__places"> // Places List
                  
                  {favorites.map((offer) => {
                    return (
                      <PlaceCard
                        offer={offer}
                        className={`favorites__card`}
                        onCardMouseEnter={() => {}}
                        onCardMouseLeave={() => {}}
                        onItemClick={onCardTitleClick}
                      />
                    );
                  })}

                  <article className="favorites__card place-card"> // Place Card
                    
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img className="place-card__image" src="img/apartment-small-03.jpg" width="150" height="110" alt="Place image" />
                      </a>
                    </div>

                    <div className="favorites__card-info place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;180</b>
                          <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark" />
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style="width: 100%"></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">Nice, cozy, warm big bed apartment</a>
                      </h2>
                      <p className="place-card__type">Apartment</p>
                    </div>

                  </article> // Place Card

                </div> // Places List

              </li>
            </ul>

          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link
          className="footer__logo-link"
          to={AppRoute.ROOT}
        >
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(offerPropTypes),
};

const mapStateToProps = (state) => ({
  favorites: getFavorites(state),
});

export {Favorites};
export default connect(mapStateToProps)(Favorites);
