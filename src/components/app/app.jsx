import React, {PureComponent} from "react";
import {Router, Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import PlaceDetails from "../place-details/place-details.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {ActionCreator} from "../../reducer/application/application.js";
import {connect} from "react-redux";
import cityPropTypes from "../../prop-types/city-prop-types.js";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import {getOffersByCity} from "../../reducer/data/selectors.js";
import withActiveCard from "../../hocs/with-active-card/with-active-card.js";
import {getCurrentCity, getOfferId, getScreenMode} from "../../reducer/application/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {Operation as UserOperation, AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute, ScreenMode} from "../../common/const.js";
import history from "../../history.js";


const MainWrapped = withActiveCard(Main);
const PlaceDetailsWrapped = withActiveCard(PlaceDetails);

class App extends PureComponent {
  render() {
    const {
      currentCity,
      offerId,
      offers,
      handleCardTitleClick,
      login,
      authorizationStatus
    } = this.props;
    const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <MainWrapped
              city={currentCity}
              offers={offers}
              onCardTitleClick={handleCardTitleClick}
            />
          </Route>
          <Route exact path="/details">
            <PlaceDetailsWrapped
              city={currentCity}
              offerId={offerId}
              offers={offers}
              onCardTitleClick={handleCardTitleClick}
              isAuthorized={isAuthorized}
            />
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <SignIn
              onSubmit={login}
            />
          </Route>
          <Route exact path={AppRoute.FAVORITES}>
            <Favorites
              onCardTitleClick={handleCardTitleClick}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  screenMode: PropTypes.string.isRequired,
  currentCity: cityPropTypes,
  offerId: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  handleCardTitleClick: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  screenMode: getScreenMode(state),
  offerId: getOfferId(state),
  currentCity: getCurrentCity(state),
  offers: getOffersByCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
    dispatch(ActionCreator.changeScreen(ScreenMode.MAIN));
  },
  handleCardTitleClick(offerId) {
    dispatch(ActionCreator.changeScreen(ScreenMode.DETAILS));
    dispatch(ActionCreator.selectOffer(offerId));
    dispatch(DataOperation.loadNearby(offerId));
    dispatch(DataOperation.loadReviews(offerId));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
