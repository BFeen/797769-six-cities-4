import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PlaceCardList from "../place-card-list/place-card-list.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import Sorting from "../sorting/sorting.jsx";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import cityPropTypes from "../../prop-types/city-prop-types.js";
import {ActionCreator} from "../../reducer/application/application.js";
import {getSortedOffers} from "../../common/utils.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {getSortType} from "../../reducer/application/selectors.js";


const PlaceCardListWrapped = withActiveItem(PlaceCardList);
const CitiesListWrapped = withActiveItem(CitiesList);

const Main = (props) => {
  const {
    sortType,
    city,
    offers,
    mapClassName,
    onCardTitleClick,
    handleCityChange,
    handleSortTypeChange,
    onCardMouseEnter,
    onCardMouseLeave,
    activeCard,
  } = props;

  const placesCount = offers.length;
  const isEmpty = placesCount === 0;
  const sortedOffers = getSortedOffers(offers, sortType);

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
      <main className={`page__main page__main--index ${isEmpty ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <CitiesListWrapped
              currentCity={city}
              onItemClick={handleCityChange}
            />

          </section>
        </div>
        <div className="cities">

          {isEmpty
            ? <MainEmpty />
            : <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{placesCount} places to stay in {city.name}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>

                  <Sorting
                    onSortTypeChange={handleSortTypeChange}
                  />

                </form>

                <PlaceCardListWrapped
                  offers={sortedOffers}
                  onItemClick={onCardTitleClick}
                  isMain={true}
                  onCardMouseEnter={onCardMouseEnter}
                  onCardMouseLeave={onCardMouseLeave}
                />

              </section>
              <div className="cities__right-section">
                <Map
                  city={city}
                  mapClassName={mapClassName}
                  offers={offers}
                  activeCard={activeCard}
                />
              </div>
            </div>
          }

        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  city: cityPropTypes,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  sortType: PropTypes.string.isRequired,
  mapClassName: PropTypes.string.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  handleCityChange: PropTypes.func.isRequired,
  handleSortTypeChange: PropTypes.func.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  activeCard: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  sortType: getSortType(state),
});

const mapDispatchToPtops = (dispatch) => ({
  handleCityChange(city) {
    dispatch(ActionCreator.changeCity(city));
  },

  handleSortTypeChange(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToPtops)(Main);
