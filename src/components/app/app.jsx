import React, {PureComponent} from "react";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
// import PlaceDetails from "../place-details/place-details.jsx";
import SignIn from "../sign-in/sign-in.jsx";
// import Favorites from "../favorites/favorites.jsx";
import {ActionCreator} from "../../reducer/application/application.js";
import {connect} from "react-redux";
import cityPropTypes from "../../prop-types/city-prop-types.js";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import {getOffersByCity} from "../../reducer/data/selectors.js";
import withActiveCard from "../../hocs/with-active-card/with-active-card.js";
import {getCurrentCity, getOfferId} from "../../reducer/application/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../common/const.js";
import history from "../../history.js";


const MainWrapped = withActiveCard(Main);
// const PlaceDetailsWrapped = withActiveCard(PlaceDetails);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._onBookmarkClick = this._onBookmarkClick.bind(this);
  }

  _onBookmarkClick(offerId, isFavorite) {
    if (this.props.authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return history.push(AppRoute.LOGIN);
    }

    const {handleBookmarkClick} = this.props;
    const status = +!isFavorite;

    handleBookmarkClick(offerId, status);

    return true;
  }

  _renderSignIn() {
    const {login, authorizationStatus} = this.props;

    if (authorizationStatus === AuthorizationStatus.AUTH) {
      return <Redirect to={AppRoute.FAVORITES}/>;
    }

    return (
      <SignIn
        onSubmit={login}
      />
    );
  }

  render() {
    const {
      currentCity,
      // offerId,
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
          {/* <Route exact path="/details"
            render={() => (
              <PlaceDetailsWrapped
                city={currentCity}
                offerId={offerId}
                offers={offers}
                onCardTitleClick={handleCardTitleClick}
                isAuthorized={isAuthorized}
                onBookmarkClick={this._onBookmarkClick}
              />
            )}
          /> */}
          <Route exact path={AppRoute.LOGIN}
            render={() => (
              this._renderSignIn()
            )}
          />
          {/* <Route exact path={AppRoute.FAVORITES}>
            <Favorites
              isAuthorized={isAuthorized}
              onCardTitleClick={handleCardTitleClick}
              onBookmarkClick={this._onBookmarkClick}
            />
          </Route> */}
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  currentCity: cityPropTypes,
  offerId: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  handleCardTitleClick: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  offerId: getOfferId(state),
  currentCity: getCurrentCity(state),
  offers: getOffersByCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  handleCardTitleClick(offerId) {
    dispatch(ActionCreator.selectOffer(offerId));
    dispatch(DataOperation.loadNearby(offerId));
    dispatch(DataOperation.loadReviews(offerId));
  },
  handleBookmarkClick: (offerId, status) => {
    dispatch(DataOperation.postFavorites(offerId, status));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
