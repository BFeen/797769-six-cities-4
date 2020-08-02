import React from "react";
import PropTypes, { oneOfType } from "prop-types";
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
import {getAuthorizationStatus, getUserData} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {ClassNames} from "../../common/const.js";


const PlaceCardListWrapped = withActiveItem(PlaceCardList);
const CitiesListWrapped = withActiveItem(CitiesList);

const Main = (props) => {
  const {
    sortType,
    city,
    offers,
    onCardTitleClick,
    handleCityChange,
    handleSortTypeChange,
    onCardMouseEnter,
    onCardMouseLeave,
    activeCard,
    user,
  } = props;

  const placesCount = offers.length;
  const isEmpty = placesCount === 0;
  const sortedOffers = getSortedOffers(offers, sortType);
  const {
    LoginClassNames,
    CitiesListClassNames,
    CardClassNames,
    MapClassNames} = ClassNames;
  
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
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span
                      className={user.email ? LoginClassNames.AUTH : LoginClassNames.NO_AUTH}
                    >
                      {user.email ? user.email : `Sign in`}
                    </span>
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
                  mapClassName={MapClassNames.CITIES}
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
  user: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
    }),
    PropTypes.object,
  ]).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  city: cityPropTypes,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  sortType: PropTypes.string.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  handleCityChange: PropTypes.func.isRequired,
  handleSortTypeChange: PropTypes.func.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  activeCard: oneOfType([
    offerPropTypes,
    PropTypes.object.isRequired,
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUserData(state),
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
