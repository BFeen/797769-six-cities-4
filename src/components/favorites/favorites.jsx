import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Header from "../header/header.jsx";
import PlaceCardList from "../place-card-list/place-card-list.jsx";
import FavoritesEmpty from "../favorites-empty/favorites-empty.jsx";
import {getFavorites} from "../../reducer/data/selectors.js";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import {AppRoute, ScreenType} from "../../common/const.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";


const PlaceCardListWrapped = withActiveItem(PlaceCardList);

const Favorites = (props) => {
  const {favorites, onCardTitleClick, onBookmarkClick} = props;
  const citiesList = [...new Set(favorites.map((item) => item.city))];
  const isEmpty = favorites.length === 0;

  return (
    <div className="page">

      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {isEmpty
            ? <FavoritesEmpty />
            : <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">

                {citiesList.map((city) => {
                  const filteredCards = favorites.filter((item) => item.city === city);

                  return (
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>

                      <PlaceCardListWrapped
                        offers={filteredCards}
                        screenType={ScreenType.FAVORITES}
                        onItemClick={onCardTitleClick}
                        onCardMouseEnter={() => {}}
                        onCardMouseLeave={() => {}}
                        onBookMarkClick={onBookmarkClick}
                      />

                    </li>
                  );
                })}

              </ul>
            </section>
          }

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
  favorites: PropTypes.oneOfType([
    PropTypes.arrayOf(offerPropTypes),
    PropTypes.array,
  ]).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favorites: getFavorites(state),
});

export {Favorites};
export default connect(mapStateToProps)(Favorites);
