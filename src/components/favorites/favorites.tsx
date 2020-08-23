import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Header from "../header/header";
import PlaceCardList from "../place-card-list/place-card-list";
import FavoritesEmpty from "../favorites-empty/favorites-empty";
import {getFavorites} from "../../reducer/data/selectors";
import {Operation} from "../../reducer/data/data";
import {IOffer} from "../../common/types";
import {AppRoute, ScreenType} from "../../common/const";
import withActiveItem from "../../hocs/with-active-item/with-active-item";


interface Props {
    favorites: IOffer[];
    onCardTitleClick: (offer: IOffer) => void;
    onBookmarkClick: (offerId: number, isFAvorite: boolean) => void;
    loadFavorites: () => IOffer[] | [];
}

const PlaceCardListWrapped = withActiveItem(PlaceCardList);

class Favorites extends React.PureComponent<Props, {}> {
  componentDidMount() {
    this.props.loadFavorites();
  }

  render() {
    const {favorites, onCardTitleClick, onBookmarkClick} = this.props;
    const citiesList = [...new Set(favorites.map((item) => item.city.name))];
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
                    const filteredCards = favorites.filter((item) => item.city.name === city);

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
                          onBookmarkClick={onBookmarkClick}
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
  }
}

const mapStateToProps = (state) => ({
  favorites: getFavorites(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites() {
    dispatch(Operation.loadFavorites());
  },
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
