import React from "react";
import PropTypes from "prop-types";


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

const createPlaceCardTemplate = (offers, onCardTitleClick) => {
  return offers.map((offer, index) => {
    return (
      <article key={offer + index} className="cities__place-card place-card">
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;120</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: 80 + `%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2
            onClick={onCardTitleClick}
            className="place-card__name"
          >
            <a href="#">{offer}</a>
          </h2>
          <p className="place-card__type">Apartment</p>
        </div>
      </article>
    );
  });
};

const Main = (props) => {
  const {cities, placesToStay, offers, onCardTitleClick} = props;

  const placeCardMarkup = createPlaceCardTemplate(offers, onCardTitleClick);
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
              <b className="places__found">{placesToStay} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <select className="places__sorting-type" id="places-sorting" defaultValue="popular">
                  <option className="places__option" value="popular">Popular</option>
                  <option className="places__option" value="to-high">Price: low to high</option>
                  <option className="places__option" value="to-low">Price: high to low</option>
                  <option className="places__option" value="top-rated">Top rated first</option>
                </select>
              </form>
              <div className="cities__places-list places__list tabs__content">

                {placeCardMarkup}

              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  placesToStay: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

export default Main;