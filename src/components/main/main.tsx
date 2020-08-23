import * as React from "react";
import {connect} from "react-redux";
import PlaceCardList from "../place-card-list/place-card-list";
import CitiesList from "../cities-list/cities-list";
import Map from "../map/map";
import MainEmpty from "../main-empty/main-empty";
import Sorting from "../sorting/sorting";
import Header from "../header/header";
import {IOffer, ICity} from "../../common/types";
import {ActionCreator} from "../../reducer/application/application";
import {getSortedOffers} from "../../common/utils";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withSorting from "../../hocs/with-sorting/with-sorting";
import {getSortType} from "../../reducer/application/selectors";
import {ClassNames, ScreenType} from "../../common/const";




interface Props {
  errorMessage: string;
  isAuthorized: boolean;
  city: ICity,
  offers: IOffer[];
  sortType: string;
  activeCard?: IOffer;
  onCardTitleClick: (offer: IOffer) => void;
  handleCityChange: (city: ICity) => void;
  handleSortTypeChange: (sortType: string) => void;
  onCardMouseEnter: (offer: IOffer) => void;
  onCardMouseLeave: () => void;
  onBookmarkClick: (offerId: number, status: number) => void;
}

const SortingWrapped = withSorting(Sorting);
const PlaceCardListWrapped = withActiveItem(PlaceCardList);
const CitiesListWrapped = withActiveItem(CitiesList);

const Main: React.FunctionComponent<Props> = (props: Props) => {
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
