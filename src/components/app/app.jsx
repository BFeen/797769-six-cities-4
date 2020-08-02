import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
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
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {ScreenMode} from "../../common/const.js";


const MainWrapped = withActiveCard(Main);
const PlaceDetailsWrapped = withActiveCard(PlaceDetails);

class App extends PureComponent {
  _renderMainPage() {
    const {
      screenMode,
      currentCity,
      offers,
      offerId,
      handleCardTitleClick,
      login
    } = this.props;
    // const offer = offers.find((item) => item.id === offerId);

    switch (screenMode) {
      case ScreenMode.MAIN:
        return (
          <MainWrapped
            city={currentCity}
            offers={offers}
            onCardTitleClick={handleCardTitleClick}
          />
        );
      case ScreenMode.DETAILS:
        return (
          <PlaceDetailsWrapped
            city={currentCity}
            offerId={offerId}
            offers={offers}
            onCardTitleClick={handleCardTitleClick}
          />
        );
      case ScreenMode.SIGN_IN:
        return (
          <SignIn
            onSubmit={login}
          />
        );
    }

    return null;
  }

  render() {
    const {currentCity, offers, handleCardTitleClick, login} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainPage()}
          </Route>
          <Route exact path="/details">
            <PlaceDetailsWrapped
              city={currentCity}
              offerId={0}
              offers={offers}
              onCardTitleClick={handleCardTitleClick}
            />
          </Route>
          <Route exact path="/sign-in">
            <SignIn
              onSubmit={login}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  screenMode: PropTypes.string.isRequired,
  currentCity: cityPropTypes,
  offerId: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  handleCardTitleClick: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
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
