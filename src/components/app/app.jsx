import React, {PureComponent} from "react";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Favorites from "../favorites/favorites.jsx";
import Main from "../main/main.jsx";
import PlaceDetails from "../place-details/place-details.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import cityPropTypes from "../../prop-types/city-prop-types.js";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import withActiveCard from "../../hocs/with-active-card/with-active-card.js";
import {getCurrentCity} from "../../reducer/application/selectors.js";
import {getOffersByCity, getOffers, getError} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../common/const.js";
import history from "../../history.js";


const MainWrapped = withActiveCard(Main);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._onBookmarkClick = this._onBookmarkClick.bind(this);
  }

  render() {
    const {
      errorMessage,
      currentCity,
      offers,
      handleCardTitleClick,
      authorizationStatus
    } = this.props;
    const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

    if (errorMessage) {
      return <Redirect to={AppRoute.ROOT} />;
    }

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}
            render={() => (
              <MainWrapped
                errorMessage={errorMessage}
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
            render={() => (this._renderSignIn())}
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
    const isLoading = this.props.offersAll.length === 0;

    if (isLoading) {
      return (
        <div>Loading...</div>
      );
    }

    const {
      offersAll,
      handleCardTitleClick,
      authorizationStatus,
    } = this.props;

    const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
    const currentOffer = offersAll.find((item) => item.id === parseInt(offerId, 10));

    return (
      <PlaceDetails
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
  errorMessage: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  offersAll: PropTypes.arrayOf(offerPropTypes).isRequired,
  currentCity: cityPropTypes,
  handleCardTitleClick: PropTypes.func.isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: getError(state),
  authorizationStatus: getAuthorizationStatus(state),
  currentCity: getCurrentCity(state),
  offers: getOffersByCity(state),
  offersAll: getOffers(state),
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
