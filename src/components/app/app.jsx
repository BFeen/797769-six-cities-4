import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import PlaceDetails from "../place-details/place-details.jsx";
import {MapClassNames} from "../../common/const.js";
import {ActionCreator} from "../../reducer/application/application.js";
import {connect} from "react-redux";
import cityPropTypes from "../../prop-types/city-prop-types.js";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import reviewPropTypes from "../../prop-types/review-prop-types.js";
import withActiveCard from "../../hocs/with-active-card/with-active-card.js";
import {getCurrentCity, getOfferId} from "../../reducer/application/selectors.js";
import {getOffersByCity} from "../../reducer/data/selectors.js";


const MainWrapped = withActiveCard(Main);
const PlaceDetailsWrapped = withActiveCard(PlaceDetails);

class App extends PureComponent {
  _renderMainPage() {
    const {currentCity, offers, offerId, handleCardTitleClick} = this.props;
    const offer = offers.find((item) => item.id === offerId);

    if (!offer) {
      return (
        <MainWrapped
          city={currentCity}
          offers={offers}
          mapClassName={MapClassNames.CITIES}
          onCardTitleClick={handleCardTitleClick}
        />
      );
    } else {
      const {reviews} = this.props;
      return (
        <PlaceDetailsWrapped
          city={currentCity}
          offerId={offerId}
          offers={offers}
          reviews={reviews}
          mapClassName={MapClassNames.PROPERTY}
          onCardTitleClick={handleCardTitleClick}
        />
      );
    }
  }

  render() {
    const {currentCity, offers, reviews, handleCardTitleClick} = this.props;
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
              reviews={reviews}
              mapClassName={MapClassNames.PROPERTY}
              onCardTitleClick={handleCardTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  currentCity: cityPropTypes,
  offerId: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
  handleCardTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offerId: getOfferId(state),
  currentCity: getCurrentCity(state),
  offers: getOffersByCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleCardTitleClick(offerId) {
    dispatch(ActionCreator.selectOffer(offerId));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
