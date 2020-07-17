import React from "react";
import PropTypes from "prop-types";
import PlaceCardList from "../place-card-list/place-card-list.jsx";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import cityPropTypes from "../../prop-types/city-prop-types.js";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";


const Main = (props) => {
  const {
    renderMap,
    city,
    offers,
    mapClassName,
    onCardTitleClick,
    onCityChange,
  } = props;

  const placesCount = offers.length;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <CitiesList
              currentCity={city}
              onCityChange={onCityChange}
            />

          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in {city.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <select className="places__sorting-type" id="places-sorting" defaultValue="popular">
                  <option className="places__option" value="popular">Popular</option>
                  <option className="places__option" value="to-high">Price: low to high</option>
                  <option className="places__option" value="to-low">Price: high to low</option>
                  <option className="places__option" value="top-rated">Top rated first</option>
                </select>
              </form>

              <PlaceCardList
                offers={offers}
                onCardTitleClick={onCardTitleClick}
                isMain={true}
              />

            </section>
            <div className="cities__right-section">
              <Map
                city={city}
                mapClassName={mapClassName}
                offers={offers}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

Main.propTypes = {
  city: cityPropTypes,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  mapClassName: PropTypes.string.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCityChange: PropTypes.func.isRequired,
};

export default Main;
