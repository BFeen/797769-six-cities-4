import React, {PureComponent} from "react";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import PlaceDetails from "../place-details/place-details.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import Favorites from "../favorites/favorites.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import {connect} from "react-redux";
import cityPropTypes from "../../prop-types/city-prop-types.js";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import {getOffersByCity} from "../../reducer/data/selectors.js";
import withActiveCard from "../../hocs/with-active-card/with-active-card.js";
import {getCurrentCity} from "../../reducer/application/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../common/const.js";
import history from "../../history.js";


const MainWrapped = withActiveCard(Main);
const PlaceDetailsWrapped = withActiveCard(PlaceDetails);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._onBookmarkClick = this._onBookmarkClick.bind(this);
  }

  render() {
    const {
      currentCity,
      offers,
      handleCardTitleClick,
      authorizationStatus
    } = this.props;
    const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}
            render={() => (
              <MainWrapped
                city={currentCity}
                offers={offers}
                onCardTitleClick={handleCardTitleClick}
                isAuthorized={isAuthorized}
                onBookmarkClick={this._onBookmarkClick}
              />
            )}
          />
          <Route exact path={`${AppRoute.DETAILS}/:id`}
            render={({match}) => (
              this._renderDetailsScreen(match.params.id)
            )}
          />
          <Route exact path={AppRoute.LOGIN}
            render={() => (
              this._renderSignIn()
            )}
          />
          <PrivateRoute exact path={AppRoute.FAVORITES}
            render={() => (
              <Favorites
                onCardTitleClick={handleCardTitleClick}
                onBookmarkClick={this._onBookmarkClick}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }

  _onBookmarkClick(offerId, isFavorite) {
    if (this.props.authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return <Redirect to={AppRoute.LOGIN} />;
    }

    const {handleBookmarkClick} = this.props;
    const status = +!isFavorite;

    handleBookmarkClick(offerId, status);

    return true;
  }

  _renderSignIn() {
    const {login, authorizationStatus} = this.props;

    if (authorizationStatus === AuthorizationStatus.AUTH) {
      return <Redirect to={AppRoute.FAVORITES} />;
    }

    return (
      <SignIn
        onSubmit={login}
      />
    );
  }

  _renderDetailsScreen(offerId) {
    const {
      offers,
      currentCity,
      handleCardTitleClick,
      authorizationStatus,
    } = this.props;
    const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
    const currentOffer = offers.find((item) => item.id === parseInt(offerId, 10));
    

    return (
      <PlaceDetailsWrapped
        city={currentCity}
        currentOffer={currentOffer}
        onCardTitleClick={handleCardTitleClick}
        isAuthorized={isAuthorized}
        onBookmarkClick={this._onBookmarkClick}
      />
    );
  }

  _renderFavorites() {
    const {handleCardTitleClick, loadFavorites} = this.props;
    loadFavorites();

    return (
      <Favorites
        onCardTitleClick={handleCardTitleClick}
        onBookmarkClick={this._onBookmarkClick}
      />
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  currentCity: cityPropTypes,
  handleCardTitleClick: PropTypes.func.isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  currentCity: getCurrentCity(state),
  offers: getOffersByCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  loadFavorites() {
    dispatch(DataOperation.loadFavorites());
  },
  handleCardTitleClick(offer) {
    dispatch(DataOperation.loadNearby(offer.id));
    dispatch(DataOperation.loadReviews(offer.id));
  },
  handleBookmarkClick: (offerId, status) => {
    dispatch(DataOperation.postFavorites(offerId, status));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
