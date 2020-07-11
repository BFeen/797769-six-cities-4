import {BrowserRouter, Switch, Route} from "react-router-dom";
import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import PlaceDetails from "../place-details/place-details.jsx";
import offerPropTypes from "../../prop-types/offer-prop-types.js";
import reviewPropTypes from "../../prop-types/review-prop-types.js";
import {MapClassNames} from "../../common/const.js";
import {ActionCreator} from "../../reducer.js";
import {connect} from "react-redux";


class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers, reviews, handleCardTitleClick} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainPage()}
          </Route>
          <Route exact path="/details">
            <PlaceDetails
              mapClassName={MapClassNames.PROPERTY}
              offerId={0}
              offers={offers}
              reviews={reviews}
              onCardTitleClick={handleCardTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderMainPage() {
    const {offers, offerId, handleCardTitleClick} = this.props;
    const offer = offers.find((item) => item.id === offerId);

    if (!offer) {
      const {city, onCityChange} = this.props;
      return (
        <Main
          city={city}
          offers={offers}
          mapClassName={MapClassNames.CITIES}
          onCardTitleClick={handleCardTitleClick}
          onCityChange={onCityChange}
        />
      );
    } else {
      const {reviews} = this.props;
      return (
        <PlaceDetails
          offerId={offerId}
          offers={offers}
          reviews={reviews}
          mapClassName={MapClassNames.PROPERTY}
          onCardTitleClick={handleCardTitleClick}
        />
      );
    }
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(offerPropTypes).isRequired,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
};

const mapStateToProps = (state) => ({
  offerId: state.offerId,
  city: state.city,
  offers: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(cityName) {
    dispatch(ActionCreator.changeCity(cityName));
    dispatch(ActionCreator.getOffers(cityName));
  },

  handleCardTitleClick(id) {
    dispatch(ActionCreator.selectOffer(id));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
