import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import PlaceDetails from "../place-details/place-details.jsx";
import {MapClassNames} from "../../common/const.js";
import {ActionCreator} from "../../reducer.js";
import {connect} from "react-redux";
import cityPropTypes from "../../prop-types/city-prop-types.js";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import reviewPropTypes from "../../prop-types/review-prop-types.js";

class App extends PureComponent {
  _renderMainPage() {
    const {city, offers, offerId, handleCardTitleClick} = this.props;
    const offer = offers.find((item) => item.id === offerId);

    if (!offer) {
      const {handleCityChange} = this.props;
      return (
        <Main
          city={city}
          offers={offers}
          mapClassName={MapClassNames.CITIES}
          onCardTitleClick={handleCardTitleClick}
          onCityChange={handleCityChange}
        />
      );
    } else {
      const {reviews} = this.props;
      return (
        <PlaceDetails
          city={city}
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
    const {city, offers, reviews, handleCardTitleClick} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainPage()}
          </Route>
          <Route exact path="/details">
            <PlaceDetails
              city={city}
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
  city: cityPropTypes,
  offerId: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
  handleCardTitleClick: PropTypes.func.isRequired,
  handleCityChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offerId: state.offerId,
  city: state.city,
  offers: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  handleCityChange(city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getOffers(city.name));
  },

  handleCardTitleClick(offerId) {
    dispatch(ActionCreator.selectOffer(offerId));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
