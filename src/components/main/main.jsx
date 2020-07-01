import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCardList from "../place-card-list/place-card-list.jsx";
import Map from "../map/map.jsx";
import {offerPropTypes} from "../../mocks/offer-prop-type.js";


const createLocationsListTemplate = (cities) => {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city, index) => {
        const isActive = index === 3;
        let className = `locations__item-link tabs__item`;

        if (isActive) {
          className += ` tabs__item--active`;
        }

        return (
          <li key={city + index} className="locations__item">
            <a className={className} href="#">
              <span>{city}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

class Main extends PureComponent {
  render() {
    const {cities, placesCount, offers, onCardTitleClick} = this.props;

    const citiesMarkup = createLocationsListTemplate(cities);

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

              {citiesMarkup}

            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{placesCount} places to stay in Amsterdam</b>
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
                />

              </section>
              <div className="cities__right-section">

                <section className="cities__map map">
                  <Map
                    offers={offers}
                  />
                </section>

              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  placesCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

export default Main;
