import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PlaceCardList from "../place-card-list/place-card-list.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import Sorting from "../sorting/sorting.jsx";
import Header from "../header/header.jsx";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import cityPropTypes from "../../prop-types/city-prop-types.js";
import {ActionCreator} from "../../reducer/application/application.js";
import {getSortedOffers} from "../../common/utils.js";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import withSorting from "../../hocs/with-sorting/with-sorting.js";
import {getSortType} from "../../reducer/application/selectors.js";
import {ClassNames, ScreenType} from "../../common/const.js";


const SortingWrapped = withSorting(Sorting);
const PlaceCardListWrapped = withActiveItem(PlaceCardList);
const CitiesListWrapped = withActiveItem(CitiesList);

const Main = (props) => {
  const {
    errorMessage,
    isAuthorized,
    sortType,
    city,
    offers,
    onCardTitleClick,
    handleCityChange,
    handleSortTypeChange,
    onCardMouseEnter,
    onCardMouseLeave,
    activeCard,
    onBookmarkClick,
  } = props;

  const placesCount = offers.length;
  const isEmpty = placesCount === 0;
  const sortedOffers = getSortedOffers(offers, sortType);
  const {MapClassNames} = ClassNames;

  return (
    <div className="page page--gray page--main">

      <Header />

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

          {isEmpty || errorMessage
            ? <MainEmpty errorMessage={errorMessage} city={city.name}/>
            : <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{placesCount} places to stay in {city.name}</b>

                <SortingWrapped
                  currentSortType={sortType}
                  onSortTypeChange={handleSortTypeChange}
                />

                <PlaceCardListWrapped
                  isAuthorized={isAuthorized}
                  offers={sortedOffers}
                  screenType={ScreenType.MAIN}
                  onItemClick={onCardTitleClick}
                  onCardMouseEnter={onCardMouseEnter}
                  onCardMouseLeave={onCardMouseLeave}
                  onBookmarkClick={onBookmarkClick}
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
  errorMessage: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  city: cityPropTypes,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  sortType: PropTypes.string.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  handleCityChange: PropTypes.func.isRequired,
  handleSortTypeChange: PropTypes.func.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  activeCard: PropTypes.oneOfType([
    offerPropTypes,
    PropTypes.object.isRequired,
  ]).isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sortType: getSortType(state),
});

const mapDispatchToPtops = (dispatch) => ({
  handleCityChange(city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.resetSortType());
  },

  handleSortTypeChange(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToPtops)(Main);
